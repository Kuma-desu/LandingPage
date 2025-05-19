document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const result = document.getElementById("formResult");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    result.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            result.innerHTML = '<div class="alert alert-danger">' + data["errors"].map(error => error.message).join(", ") + '</div>';
                        } else {
                            result.innerHTML = '<div class="alert alert-danger">Oops! Something went wrong.</div>';
                        }
                    });
                }
            })
            .catch(error => {
                result.innerHTML = '<div class="alert alert-danger">Error sending message. Please try again later.</div>';
                console.error(error);
            });
        });
    }
});
