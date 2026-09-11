const symptoms = {

    "Fever": {

        conditions: [
            "Flu",
            "Dengue",
            "Typhoid"
        ],

        care:
            "Rest, drink fluids and monitor temperature."

    },


    "Cough": {

        conditions: [
            "Common cold",
            "Flu",
            "Bronchitis"
        ],

        care:
            "Drink warm fluids and get adequate rest."

    },


    "Headache": {

        conditions: [
            "Migraine",
            "Stress",
            "Dehydration"
        ],

        care:
            "Rest, drink water and get adequate sleep."

    },


    "Stomach Pain": {

        conditions: [
            "Gas",
            "Food poisoning",
            "Acidity"
        ],

        care:
            "Eat light food, stay hydrated and avoid spicy food."

    }

};



const medicines = {

    "paracetamol": {

        use:
            "Commonly used to reduce fever and relieve mild pain.",

        side:
            "Possible side effects may include nausea or stomach discomfort.",

        warning:
            "Do not exceed the recommended dose. Check package directions and ask a doctor or pharmacist if unsure."

    },


    "ibuprofen": {

        use:
            "Used for pain, inflammation and fever.",

        side:
            "May cause stomach irritation and other side effects.",

        warning:
            "Not suitable for everyone. Ask a doctor or pharmacist before use."

    },


    "cetirizine": {

        use:
            "Commonly used to relieve allergy symptoms.",

        side:
            "May cause drowsiness or tiredness.",

        warning:
            "Check with a doctor or pharmacist before taking it."

    }

};



/* TAB SYSTEM */

document
    .querySelectorAll(".tab")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".tab")
                    .forEach(
                        b =>
                            b.classList
                                .remove("active")
                    );


                document
                    .querySelectorAll(".panel")
                    .forEach(
                        p =>
                            p.classList
                                .remove("active")
                    );


                button.classList
                    .add("active");


                document
                    .getElementById(
                        button.dataset.tab
                    )
                    .classList
                    .add("active");

            }

        );

    });



/* SYMPTOM CHAT */

function askAgent() {

    const text =
        document
            .getElementById("chatInput")
            .value
            .trim()
            .toLowerCase();


    const box =
        document
            .getElementById("chatResult");


    if (!text) {

        box.innerHTML =
            `<div class="danger">
                Please describe your symptoms.
            </div>`;

        return;

    }


    let reply =
        `<b>General information:</b><br><br>`;

    let found = false;


    if (text.includes("fever")) {

        reply +=
            `🌡️ Fever can occur with
             many conditions, including infections.
             <br><br>`;

        found = true;

    }


    if (
        text.includes("headache") ||
        text.includes("head pain")
    ) {

        reply +=
            `🤕 Headache can have many causes,
             including stress or dehydration.
             <br><br>`;

        found = true;

    }


    if (text.includes("cough")) {

        reply +=
            `😷 Cough can occur with conditions
             such as a common cold or flu.
             <br><br>`;

        found = true;

    }


    if (
        text.includes("stomach pain") ||
        text.includes("stomach ache")
    ) {

        reply +=
            `🤢 Stomach pain can have several
             possible causes.
             <br><br>`;

        found = true;

    }


    if (!found) {

        reply +=
            `I could not identify one of the
             demo symptoms from your message.
             <br><br>`;

    }


    reply +=
        `💧 General care: stay hydrated
         and get adequate rest.
         <br><br>`;

    reply +=
        `⚠️ This website cannot diagnose illness.
         Consult a qualified healthcare professional.`;


    box.innerHTML =
        `<div class="result">
            ${reply}
         </div>`;

}



/* DISEASE CHECK */

function predict() {

    const selected =
        [
            ...document
                .querySelectorAll(
                    '#disease input[type="checkbox"]:checked'
                )
        ]
        .map(x => x.value);


    const box =
        document
            .getElementById("diseaseResult");


    if (!selected.length) {

        box.innerHTML =
            `<div class="danger">
                Please select at least one symptom.
             </div>`;

        return;

    }


    let html =
        "<h3>Possible Conditions</h3>";


    selected.forEach(
        symptom => {

            const data =
                symptoms[symptom];


            html +=
                `<div class="result">

                    <b>Symptom:</b>
                    ${symptom}

                    <br><br>

                    <b>Possible conditions:</b>
                    ${data.conditions.join(", ")}

                    <br><br>

                    <b>General care:</b>
                    ${data.care}

                </div>`;

        }
    );


    html +=
        `<div class="danger">

            ⚠️ These are possibilities
            for educational demonstration only,
            not a diagnosis.

            Please consult a healthcare professional.

        </div>`;


    box.innerHTML = html;

}



/* MEDICINE */

function medicineInfo() {

    const name =
        document
            .getElementById("medicineInput")
            .value
            .trim()
            .toLowerCase();


    const box =
        document
            .getElementById("medicineResult");


    if (!name) {

        box.innerHTML =
            `<div class="danger">
                Please enter a medicine name.
             </div>`;

        return;

    }


    if (!medicines[name]) {

        box.innerHTML =
            `<div class="danger">
                Medicine not found in the
                demo database.
             </div>`;

        return;

    }


    const medicine =
        medicines[name];


    const displayName =
        name.charAt(0).toUpperCase()
        + name.slice(1);


    box.innerHTML =

        `<div class="result">

            <h3>
                💊 ${displayName}
            </h3>

            <b>Use:</b>
            <br>
            ${medicine.use}

            <br><br>

            <b>Possible Side Effects:</b>
            <br>
            ${medicine.side}

            <br><br>

            <b>Important:</b>
            <br>
            ${medicine.warning}

        </div>`;

}



/* FIND NEARBY HOSPITALS */

function findHospitals() {

    const box =
        document
            .getElementById("locationResult");


    if (!navigator.geolocation) {

        box.innerHTML =
            `<div class="danger">
                Your browser does not support
                location services.
             </div>`;

        return;

    }


    box.innerHTML =
        `<div class="result">

            📍 Requesting your location...

            <br><br>

            Please allow location access
            in your browser.

        </div>`;


    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;


            const mapsUrl =
                `https://www.google.com/maps/search/?api=1&query=hospitals+near+${lat},${lon}`;


            box.innerHTML =

                `<div class="result">

                    <b>
                        Location detected.
                    </b>

                    <br><br>

                    <a
                        class="primary"
                        target="_blank"
                        href="${mapsUrl}">

                        🏥 Open Nearby Hospitals
                        in Google Maps

                    </a>

                </div>`;

        },


        () => {

            box.innerHTML =
                `<div class="danger">

                    Location access was not allowed.

                    <br><br>

                    You can use the hospital
                    links below.

                </div>`;

        }

    );

}