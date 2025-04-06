//Görünüm ve bilgi panelleri arasında geçiş yapar
function switchPanels() {
    const informationPanel = document.getElementById("information-panel");
    const viewPanel = document.getElementById("viewPanel")
    if (informationPanel.classList.contains("active")) {
        informationPanel.classList.remove("active");
        viewPanel.classList.add("active");
    }
    else {
        viewPanel.classList.remove("active");
        informationPanel.classList.add("active");
    }
}


// CV görünüm değiştirici araçları
document.addEventListener("DOMContentLoaded", () => {
    const viewInputs = [
        { inputId: "previewPanelColorInput", displayId: "rightPreviewPanel", cssProperty: "backgroundColor", event: "input" },
        { inputId: "leftPreviewPanelColorInput", displayId: "leftPreviewPanel", cssProperty: "backgroundColor", event: "input" },
        { inputId: "previewPaneltitleBlockColorInput", displayId: "title", cssProperty: "backgroundColor", event: "input" },       
        { inputId: "fontTypeInput", displayId: "previewPanel", cssProperty: "font-family", event: "change" },
        { inputId: "photoBorderInput", displayId: "photo", cssProperty: "border-radius", event: "change" },
    ];
    
    // colorInputs içinde tanımlı her input için işlem yapıyoruz
    viewInputs.forEach(({ inputId, displayId, cssProperty, event }) => {
        const inputEl = document.getElementById(inputId); // Renk inputunu al
        const displayEl = document.getElementById(displayId); // Display elementini al

        inputEl.addEventListener(event, () => {
            // İlgili özelliği değiştiriyoruz
            displayEl.style[cssProperty] = inputEl.value;
        });
    });

    // Elementin içerisindeki bütün etiketleri alır ve input'a gelen renk değerini atar
    const titleBlockFontColorInput = document.getElementById("titleBlockFontColorInput");

    titleBlockFontColorInput.addEventListener("input", () => {
        const color = titleBlockFontColorInput.value;
        const titleBlock = document.getElementById("titleBlock");

        titleBlock.querySelectorAll("h1, h2").forEach(el => {
            el.style.color = color;
        });
    });
});




// HTML tamamen yüklendikten sonra çalıştır
// Kullanıcı bilgi girişi ile ilgili fonksiyonlar
document.addEventListener("DOMContentLoaded", () => {
    const inputs = [
        { inputId: "userNameInput", displayId: "userNameDisplay" },
        { inputId: "jobTitleInput", displayId: "jobTitleDisplay" },
        { inputId: "phoneInput", displayId: "phoneDisplay" },
        { inputId: "mailInput", displayId: "mailDisplay" },
        { inputId: "addressInput", displayId: "addressDisplay" },
        { inputId: "webInput", displayId: "webDisplay" },
        { inputId: "jobExperienceInput", displayId: "jobExperienceDisplay" },
        { inputId: "aboutInput", displayId: "aboutDisplay" },
        { inputId: "abilitiesInformationInput", displayId: "abilitiesInformationDisplay" },
        { inputId: "educationInformationInput", displayId: "educationInformationDisplay" }
    ];

    inputs.forEach(({ inputId, displayId }) => {
        const inputEl = document.getElementById(inputId);
        const displayEl = document.getElementById(displayId);

        inputEl.addEventListener("input", () => {
            displayEl.textContent = inputEl.value;
        });
    });

    const userSchoolCount = document.getElementById("userSchoolCountInput");
    const schoolInputsContainer = document.getElementById("schoolInputsContainer");
    const schoolDisplay = document.getElementById("EducationsDisplay");
    // Özgeçmiş okul bölünü dinamik input ve display ekleme bölümü
    userSchoolCount.addEventListener("change", () => {

        // her change işleminde tekrar kutu eklemesin diye sıfırlıyoruz
        schoolInputsContainer.innerHTML = "";
        schoolDisplay.innerHTML = "";

        let value = parseInt(userSchoolCount.value);

        // inputbox ekleme
        for (let i = 1; i <= value; i++) {
            // input ekleme
            let label = document.createElement("label");
            label.innerText = "Okul: " + i;

            let input1 = createInputElement(i + ". Okulun adı", "school" + i);
            let input2 = createInputElement("Başlangıç / Bitiş tarihleri", "school" + i);
            input2.placeholder = "Başlangıç / Bitiş tarihleri";

            schoolInputsContainer.appendChild(label);
            schoolInputsContainer.appendChild(input1);
            schoolInputsContainer.appendChild(input2);

            // Display kısmı için yapı
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `
            <span id="schoolName${i}Display">Okul Adı</span>
            <ul class="list-unstyled ms-3 mt-1">
                <li id="schoolDate${i}Display">Tarih</li>
            </ul>`;
            schoolDisplay.appendChild(li);
        }
    });


    const userAbilitiesCount = document.getElementById("userAbilitiesCountInput");
    const abilitiesInputsContainer = document.getElementById("abilitiesInputsContainer");
    const abilitiesDisplay = document.getElementById("AbilitiesDisplay");
    userAbilitiesCount.addEventListener("change", () => {
        // her change işleminde tekrar yeni kutular eklemesin diye sıfırlıyoruz
        abilitiesInputsContainer.innerHTML = "";
        abilitiesDisplay.innerHTML = "";

        let value = parseInt(userAbilitiesCount.value);

        for (let i = 1; i <= value; i++) {
            let label = document.createElement("label");
            label.innerText = "Yetenek: " + i;

            let input1 = createInputElement(i + ". yetenek", "ability" + i);
            let input2 = createInputElement("Yetenek Seviyesi", "abilityLevel" + i);
            abilitiesInputsContainer.appendChild(label);
            abilitiesInputsContainer.appendChild(input1);
            abilitiesInputsContainer.appendChild(input2);

            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `
                <span id="ability${i}Display">Yetenek</span>
                <ul class="list-unstyled ms-3 mt-1">
                    <li id="abilityLevel${i}Display">Seviye</li>
                </ul>
            `;
            abilitiesDisplay.appendChild(li);

        }
    });

    // isteğe bağlı callback eklenip farklı dinamik modifikasyonlar yapılabilir
    // Belirlenen tipte inputbox ekler
    function createInputElement(placeholder, id, type = "text") {
        let input = document.createElement("input");
        input.placeholder = placeholder;
        input.id = id;
        input.type = type;
        input.classList.add("form-control");
        input.addEventListener("input", () => {
            const displayEl = document.getElementById(id + "Display");
            if (displayEl) {
                displayEl.textContent = input.value;
            }
        });

        return input;
    }

});
