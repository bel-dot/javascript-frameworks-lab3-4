// import all modules here
import { Book, User } from "./models";
import { LibraryService } from "./services";
import { Validation } from "./validation";

// etc.

class App {
  private _validation: Validation;
  private _service: LibraryService;
  private modal: HTMLDivElement;

  constructor() {
    this._validation = Validation.getInstance();
    this._service = LibraryService.getInstance();
    this.modal = document.querySelector(".modal") as HTMLDivElement;
    this.modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.updateUI();

    const addBookForm = document.forms.namedItem("add-book") as HTMLFormElement;
    const addUserForm = document.forms.namedItem("add-user") as HTMLFormElement;

    addBookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._validation.validateForm(addBookForm)) {
        const id = Date.now();
        const name = addBookForm["book-name"].value;
        const author = addBookForm["book-author"].value;
        const releaseYear = parseInt(addBookForm["release-year"].value);

        const book = new Book(id, name, author, releaseYear);
        this._service.addBook(book);

        addBookForm.reset();
        addBookForm.classList.remove("was-validated");
        this.updateUI();
      }
    });

    addUserForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._validation.validateForm(addUserForm)) {
        const name = addUserForm["user-name"].value;
        const email = addUserForm["user-email"].value;
        const id = Date.now(); // Generate a unique ID based on timestamp

        const user = new User(id, name, email);
        this._service.addUser(user);

        addUserForm.reset();
        addUserForm.classList.remove("was-validated");
        this.updateUI();
      }
    });
  }

  updateUI(): void {
    const returnBook = (book: Book) => {
      const user = this._service
        .getUsers()
        .find((u) => u.getId === book.getBorrower) as User;
      Object.setPrototypeOf(book, Book.prototype);
      Object.setPrototypeOf(user, User.prototype);
      if (user) {
        user.returnBook();
        book.return();

        this._service.updateBook(book.getId, book);
        this._service.updateUser(user.getId, user);

        this.showPonModal(
          `${book.getName} by ${book.getAuthor} (${book.getReleaseYear}) успішно повернена користувачем ${user.getId} ${user.getName} (${user.getEmail}).`,
        );
        this.updateUI();
      }
    };

    const borrowBook = (book: Book) => {
      const handleSubmit = (e: Event) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if (this._validation.validateForm(form)) {
          const userId = parseInt((form[0] as HTMLInputElement).value);
          const user = this._service
            .getUsers()
            .find((u) => u.getId === userId) as User;
          Object.setPrototypeOf(book, Book.prototype);
          Object.setPrototypeOf(user, User.prototype);

          if (user) {
            try {
              user.borrowBook(book);
              this._service.updateBook(book.getId, book);
              this._service.updateUser(user.getId, user);
              this.showPonModal(
                `${book.getName} by ${book.getAuthor} (${book.getReleaseYear}) успішно позичена користувачем ${user.getId} ${user.getName} (${user.getEmail}).`,
              );
              this.updateUI();
            } catch (error) {
              this.showPonModal(
                `Не вдалося позичити книгу: ${(error as Error).message}`,
              );
            }
          }
        }
      };

      const modalDialog = document.createElement("div");
      modalDialog.className = "modal-dialog modal-dialog-centered";

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      const modalHeader = document.createElement("div");
      modalHeader.className = "modal-header";

      const modalTitle = document.createElement("h5");
      modalTitle.className = "modal-title";
      modalTitle.textContent = "Введіть ID користувача для позичення книги:";

      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "btn-close";
      closeButton.setAttribute("data-bs-dismiss", "modal");
      closeButton.setAttribute("aria-label", "Close");
      closeButton.addEventListener("click", this.closeModal);

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);

      const borrowForm = document.createElement("form");
      borrowForm.className = "needs-validation";
      borrowForm.noValidate = true;
      borrowForm.name = "borrow-form";
      borrowForm.addEventListener("submit", handleSubmit);

      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";

      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.className = "form-control";
      inputField.pattern = "\\d+";
      inputField.placeholder = "ID";
      inputField.required = true;

      modalBody.appendChild(inputField);

      const modalFooter = document.createElement("div");
      modalFooter.className = "modal-footer";

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = "btn btn-secondary";
      cancelButton.setAttribute("data-bs-dismiss", "modal");
      cancelButton.textContent = "Скасувати";
      cancelButton.addEventListener("click", this.closeModal);

      const saveButton = document.createElement("button");
      saveButton.type = "submit";
      saveButton.className = "btn btn-primary";
      saveButton.textContent = "Зберегти";

      modalFooter.appendChild(cancelButton);
      modalFooter.appendChild(saveButton);

      borrowForm.appendChild(modalBody);
      borrowForm.appendChild(modalFooter);

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(borrowForm);

      modalDialog.appendChild(modalContent);

      this.modal.innerHTML = "";
      this.modal.appendChild(modalDialog);

      this.showModal();
    };

    // update the user interface here
    const bookList = document.getElementById("book-list") as Element;
    bookList.innerHTML = "";
    this._service.getBooks().forEach((book) => {
      Object.setPrototypeOf(book, Book.prototype);
      const bookItem = document.createElement("div");
      bookItem.className =
        "d-flex justify-content-between align-items-center border-bottom py-3";

      const bookInfo = document.createElement("span");
      bookInfo.textContent = `${book.getName} by ${book.getAuthor} (${book.getReleaseYear})`;

      const actionButton = document.createElement("button");
      actionButton.className = book.isBorrowed()
        ? "btn btn-warning"
        : "btn btn-primary";
      actionButton.type = "button";
      actionButton.textContent = book.isBorrowed() ? "Повернути" : "Позичити";

      if (book.isBorrowed()) {
        actionButton.addEventListener("click", () => returnBook(book));
      } else {
        actionButton.addEventListener("click", () => borrowBook(book));
      }

      bookItem.appendChild(bookInfo);
      bookItem.appendChild(actionButton);
      bookList.appendChild(bookItem);
    });

    const userList = document.getElementById("user-list") as Element;
    userList.innerHTML = "";
    this._service.getUsers().forEach((user) => {
      Object.setPrototypeOf(user, User.prototype);
      userList.innerHTML += `
                <div class="d-flex align-items-center py-3 border-bottom">
                    <span>${user.getId} ${user.getName} (${user.getEmail})</span>
                </div>
            `;
    });
  }

  showModal(): void {
    const modal = document.querySelector(".modal") as HTMLDivElement;

    modal.classList.add("show");
    document.body.classList.add("modal-open");
    modal.style.display = "block";
    modal.ariaHidden = "false";
    modal.ariaModal = "true";
    modal.role = "dialog";
  }

  showPonModal(message: string): void {
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog modal-dialog-centerd";

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.textContent = message;

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.addEventListener("click", this.closeModal);

    const img = document.createElement("img");
    img.src = "assets/pon.gif";
    img.alt = "Pon";
    img.className = "w-100 img-fluid";

    button.appendChild(img);
    modalFooter.appendChild(button);

    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);

    this.modal.innerHTML = "";
    this.modal.appendChild(modalDialog);

    this.showModal();
  }

  closeModal(): void {
    const modal = document.querySelector(".modal") as HTMLDivElement;

    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    modal.ariaHidden = "true";
    modal.ariaModal = "false";
    modal.role = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
