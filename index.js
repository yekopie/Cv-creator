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

// HTML tamamen yüklendikten sonra çalıştır
document.addEventListener("DOMContentLoaded", () => {
    const inputs = [
        { inputId: "previewPanelColorInput", displayId: "rightPreviewPanel", cssProperty: "backgroundColor", event: "input" },
        { inputId: "leftPreviewPanelColorInput", displayId: "leftPreviewPanel", cssProperty: "backgroundColor", event: "input" },
        { inputId: "previewPaneltitleBlockColorInput", displayId: "titleBlock", cssProperty: "backgroundColor", event: "input" },
        { inputId: "fontTypeInput", displayId: "previewPanel", cssProperty: "font-family", event: "change" },
        { inputId: "photoBorderInput", displayId: "photo", cssProperty: "border-radius", event: "change" },
        { inputId: "userNameInput", displayId: "userNameDisplay", event: "input" },
        { inputId: "jobTitleInput", displayId: "jobTitleDisplay", event: "input" },
        { inputId: "phoneInput", displayId: "phoneDisplay", event: "input" },
        { inputId: "mailInput", displayId: "mailDisplay", event: "input" },
        { inputId: "addressInput", displayId: "addressDisplay", event: "input" },
        { inputId: "webInput", displayId: "webDisplay", event: "input" },
        { inputId: "jobExperienceInput", displayId: "jobExperienceDisplay", event: "input" },
        { inputId: "aboutInput", displayId: "aboutDisplay", event: "input" },
        { inputId: "abilitiesInformationInput", displayId: "abilitiesInformationDisplay", event: "input" },
        { inputId: "educationInformationInput", displayId: "educationInformationDisplay", event: "input" }
    ];

    inputs.forEach(({ inputId, displayId, cssProperty, event }) => {
        const inputEl = document.getElementById(inputId); // Renk inputunu al
        const displayEl = document.getElementById(displayId); // Display elementini al

        inputEl.addEventListener(event, () => {
            // Veri girişimi yoksa görüntü üzerinde değişiklik mi yapılmış diye kontrol ediyoruz
            // İlgili özelliği değiştiriyoruz
            if (cssProperty)
                displayEl.style[cssProperty] = inputEl.value;
            else
                displayEl.textContent = inputEl.value;
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


    const userSchoolCount = document.getElementById("userSchoolCountInput");
    const schoolInputsContainer = document.getElementById("schoolInputsContainer");
    const schoolDisplay = document.getElementById("EducationsDisplay");
    // Özgeçmiş okul bölünü dinamik input ve display ekleme bölümü
    userSchoolCount.addEventListener("change", () => {


        clearContainer(schoolInputsContainer, schoolDisplay);
        let value = parseInt(userSchoolCount.value);

        // inputbox ekleme
        for (let i = 1; i <= value; i++) {
            // input ekleme
            let label = document.createElement("label");
            label.innerText = "Okul: " + i;

            let input1 = createInputElement(i + ". Okulun adı", "schoolName" + i);
            let input2 = createInputElement("Başlangıç / Bitiş tarihleri", "schoolDate" + i);
            input2.placeholder = "Başlangıç / Bitiş tarihleri";

            schoolInputsContainer.appendChild(label);
            schoolInputsContainer.appendChild(input1);
            schoolInputsContainer.appendChild(input2);

            // Display kısmı için yapı
            let li = createListElement(`schoolName${i}Display`, `schoolDate${i}Display`, "Okul", "Tarih");
            schoolDisplay.appendChild(li);
        }
    });


    const userAbilitiesCount = document.getElementById("userAbilitiesCountInput");
    const abilitiesInputsContainer = document.getElementById("abilitiesInputsContainer");
    const abilitiesDisplay = document.getElementById("AbilitiesDisplay");
    userAbilitiesCount.addEventListener("change", () => {

        clearContainer(abilitiesDisplay, abilitiesDisplay);

        let value = parseInt(userAbilitiesCount.value);

        for (let i = 1; i <= value; i++) {
            let label = document.createElement("label");
            label.innerText = "Yetenek: " + i;

            let input1 = createInputElement(i + ". yetenek", "ability" + i);
            let input2 = createInputElement("Yetenek Seviyesi", "abilityLevel" + i);
            abilitiesInputsContainer.appendChild(label);
            abilitiesInputsContainer.appendChild(input1);
            abilitiesInputsContainer.appendChild(input2);

            let li = createListElement(`ability${i}Display`, `abilityLevel${i}Display`, "Yetenek", "Seviye");
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
    //
    function createListElement(spanId, listId, spanStartText, listStartText)
    {
        let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `
                <span id="${spanId}">${spanStartText}</span>
                <ul class="list-unstyled ms-3 mt-1">
                    <li id="${listId}">${listStartText}viye</li>
                </ul>
            `;
            
            return li;
    }

    function clearContainer(inputContainer, displayContainer) {
        inputContainer.innerHTML = "";
        displayContainer.innerHTML = "";
    }
});
