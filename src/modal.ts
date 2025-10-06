export class Modal {
    private _modal: HTMLDivElement;
    private static _instance: Modal;

    public static getInstance(): Modal {
        if (!this._instance) this._instance = new Modal();

        return this._instance;
    }

    constructor() {
        this._modal = document.querySelector(".modal") as HTMLDivElement;
    }

    public show(message: string): void {
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
        button.addEventListener("click", this.hide);

        const img = document.createElement("img");
        img.src = "assets/pon.gif";
        img.alt = "Pon";
        img.className = "w-100 img-fluid";

        button.appendChild(img);
        modalFooter.appendChild(button);

        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);

        this._modal.innerHTML = "";
        this._modal.appendChild(modalDialog);

        this.appear();
    }

    public askId(handleSubmit: (e: Event) => void): void {
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
        closeButton.addEventListener("click", this.hide);

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
        cancelButton.addEventListener("click", this.hide);

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

        this._modal.innerHTML = "";
        this._modal.appendChild(modalDialog);

        this.appear();
    }

    private appear(): void {
        this._modal.classList.add("show");
        document.body.classList.add("modal-open");
        this._modal.style.display = "block";
        this._modal.ariaHidden = "false";
        this._modal.ariaModal = "true";
        this._modal.role = "dialog";
    }

    private hide(): void {
        this._modal.classList.remove("show");
        this._modal.style.display = "none";
        document.body.classList.remove("modal-open");
        this._modal.ariaHidden = "true";
        this._modal.ariaModal = "false";
        this._modal.role = "";
    }
}
