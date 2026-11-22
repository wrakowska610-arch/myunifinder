
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".search-form");
    const results = document.getElementById("university-results");

    if (!form || !results) {
        console.error("Search form or results container not found.");
        return;
    }

    const countrySelect = form.querySelector('[name="country"]');
    const subjectSelect = form.querySelector('[name="subject"]');
    const languageSelect = form.querySelector('[name="language"]');

    const fields = {
        business: "Business and Economics",
        "computer-science": "Computer Science and IT",
        engineering: "Engineering",
        "social-sciences": "Social Sciences",
        arts: "Arts and Design",
        law: "Law",
        medicine: "Medicine and Health",
        "natural-sciences": "Natural Sciences"
    };

    const countries = {
        poland: "Poland",
        germany: "Germany",
        netherlands: "Netherlands",
        sweden: "Sweden",
        denmark: "Denmark",
        france: "France",
        italy: "Italy",
        spain: "Spain",
        austria: "Austria",
        finland: "Finland",
        portugal: "Portugal",
        ireland: "Ireland",
        belgium: "Belgium",
        czechia: "Czechia",
        norway: "Norway",
        switzerland: "Switzerland",
        greece: "Greece",
        japan: "Japan",
        canada: "Canada",
        australia: "Australia"
    };

    const FAVORITES_KEY = "myUniFinderFavorites";

    let compareStarted = false;
    let searchPerformed = false;
    let scholarshipsOpened = false;

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function getFavorites() {
        try {
            const favorites = JSON.parse(
                localStorage.getItem(FAVORITES_KEY)
            );

            return Array.isArray(favorites) ? favorites : [];
        } catch {
            return [];
        }
    }

    function saveFavorites(favorites) {
        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );
    }

    function getProgramId(university, field) {
        return `${university.country}::${field}`;
    }

    function getTuition(university, field) {
        const countryFee =
            window.demoTuitionByCountry?.[university.country] ?? 5000;

        const adjustment =
            window.demoFieldAdjustments?.[field] ?? 0;

        return Math.max(0, countryFee + adjustment);
    }

    function getPrograms() {
        if (!Array.isArray(window.universities)) {
            return [];
        }

        const selectedCountry = countrySelect?.value || "";
        const selectedField = subjectSelect?.value || "";

        let programs = [];

        window.universities.forEach(university => {
            if (
                selectedCountry &&
                university.country !== selectedCountry
            ) {
                return;
            }

            const availableFields = selectedField
                ? university.fields.filter(field => field === selectedField)
                : university.fields;

            availableFields.forEach(field => {
                programs.push({
                    id: getProgramId(university, field),
                    university,
                    field,
                    tuition: getTuition(university, field)
                });
            });
        });

        return programs;
    }

    function renderResults() {
        if (!searchPerformed) {
            results.innerHTML = "";
            return;
        }

        if (!Array.isArray(window.universities)) {
            results.innerHTML = `
                <h3>University results</h3>
                <p>
                    University data could not be loaded.
                    Please check universities.js and script order.
                </p>
            `;
            return;
        }

        const programs = getPrograms();
        const selectedLanguage = languageSelect?.value || "";

        if (programs.length === 0) {
            results.innerHTML = `
                <h3>University results</h3>
                <p>No results found. Try another country or subject.</p>
            `;
            return;
        }

        const languageNote = selectedLanguage
            ? `<p class="demo-notice">
                Language filtering will be available after verified
                language data is added to the university database.
               </p>`
            : "";

        results.innerHTML = `
            <h3>University results</h3>

            <p class="results-count">
                ${programs.length} study options found
            </p>

            <p class="demo-notice">
                Demonstration data: tuition fees are illustrative,
                not verified university prices.
            </p>

            ${languageNote}

            <div id="university-list">
                ${programs.map(program => {
                    const isFavorite = getFavorites().some(
                        item => item.id === program.id
                    );

                    const uni = program.university;

                    return `
                        <article class="university-card">

                            <button
                                class="favorite-button"
                                type="button"
                                data-favorite-id="${escapeHTML(program.id)}"
                                aria-label="${isFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"}"
                                aria-pressed="${isFavorite}"
                            >${isFavorite ? "♥" : "♡"}</button>

                            <h4>
                                ${escapeHTML(
                                    fields[program.field] || program.field
                                )}
                            </h4>

                            <p class="program-university">
                                ${escapeHTML(uni.name)}
                            </p>

                            <p class="university-location">
                                ${escapeHTML(uni.city)},
                                ${escapeHTML(
                                    countries[String(uni.country).toLowerCase()]
                                    || uni.country
                                )}
                            </p>

                            <p class="program-tuition">
                                <strong>Estimated demo tuition:</strong><br>
                                €${program.tuition.toLocaleString("en-IE")}
                                / year
                            </p>

                        </article>
                    `;
                }).join("")}
            </div>
        `;

        results.querySelectorAll("[data-favorite-id]").forEach(button => {
            button.addEventListener("click", () => {
                toggleFavorite(button.dataset.favoriteId);
            });
        });
    }

    function toggleFavorite(id) {
        const favorites = getFavorites();

        const existingIndex = favorites.findIndex(
            item => item.id === id
        );

        if (existingIndex >= 0) {
            favorites.splice(existingIndex, 1);
        } else {
            const program = getPrograms().find(
                item => item.id === id
            );

            if (!program) return;

            favorites.push({
                id: program.id,
                country: program.university.country,
                university: program.university.name,
                city: program.university.city,
                field: program.field,
                tuition: program.tuition
            });
        }

        saveFavorites(favorites);

        renderResults();
        renderScholarships();

    }


    function renderScholarships() {
        const scholarshipList = document.getElementById("scholarship-list");

        if (!scholarshipList) return;

        scholarshipList.hidden = !scholarshipsOpened;

        if (!scholarshipsOpened) return;

        const favorites = getFavorites();

        const favoriteCountries = [
            ...new Set(
                favorites
                    .map(item => item.country)
                    .filter(Boolean)
            )
        ];

        if (favoriteCountries.length === 0) {
            scholarshipList.innerHTML = `
                <div class="scholarship-empty">
                    <h3>Your scholarship opportunities</h3>
                    <p>
                        Add universities to your favourites to discover
                        scholarship opportunities in their countries.
                    </p>
                </div>
            `;
            return;
        }

        const scholarshipDatabase = window.demoScholarships || {};

        const scholarshipCards = favoriteCountries
            .map(country => {
               
                const scholarshipKey = Object.keys(scholarshipDatabase)
                    .find(key =>
                        key.toLowerCase() === String(country).toLowerCase()
                    );

                if (!scholarshipKey) return "";

                const scholarship = scholarshipDatabase[scholarshipKey];

                return `
                    <article class="scholarship-card">

                        <div class="scholarship-card-top">
                            <span class="scholarship-country">
                                ${escapeHTML(scholarshipKey)}
                            </span>

                            <span class="scholarship-label">
                                SCHOLARSHIP
                            </span>
                        </div>

                        <h3>${escapeHTML(scholarship.name)}</h3>

                        <div class="scholarship-amount">
                            <span>FINANCIAL SUPPORT</span>
                            <p>${escapeHTML(scholarship.amount)}</p>
                        </div>

                        <div class="scholarship-detail">
                            <h4>Tuition fee coverage</h4>
                            <p>${escapeHTML(scholarship.tuition)}</p>
                        </div>

                        <div class="scholarship-detail">
                            <h4>Additional benefits</h4>
                            <p>${escapeHTML(scholarship.benefits)}</p>
                        </div>

                        <div class="scholarship-detail">
                            <h4>Who can apply?</h4>
                            <p>${escapeHTML(scholarship.who)}</p>
                        </div>

                        <a
                            class="scholarship-link"
                            href="${escapeHTML(scholarship.url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explore scholarship ↗
                        </a>

                    </article>
                `;
            })
            .filter(Boolean)
            .join("");

        scholarshipList.innerHTML = `
            <div class="scholarship-intro">
                <h3>Scholarships based on your favourites</h3>

                <p>
                    Explore funding opportunities in the countries
                    where your favourite universities are located.
                </p>

                <p class="scholarship-disclaimer">
                    Information is illustrative. Always check the official
                    programme website for current amounts and eligibility.
                </p>
            </div>

            <div class="scholarship-grid">
                ${scholarshipCards}
            </div>
        `;

        if (!scholarshipCards) {
            scholarshipList.innerHTML += `
                <p>No scholarship information is available for these countries.</p>
            `;
        }
    }


    function stopComparison() {
        compareStarted = false;

        const section = document.getElementById("comparison-placeholder");

        if (section) {
            section.innerHTML = `
                <h3>Make an informed decision</h3>
                <p>Start comparing when you are ready.</p>
            `;
        }
    }

    function renderComparison() {
        if (!compareStarted) return;

        const section = document.getElementById("comparison-placeholder");

        if (!section) return;

        const favorites = getFavorites();

        if (favorites.length === 0) {
            section.innerHTML = `
                <h3>Make an informed decision</h3>

                <p>No saved study options yet.</p>

                <p>
                    Go to University Search and click the heart
                    on a university card to add it to your comparison.
                </p>

                <button
                    type="button"
                    id="stop-comparing"
                    class="button button-secondary"
                >Stop Comparing</button>
            `;

            section.querySelector("#stop-comparing")
                ?.addEventListener("click", stopComparison);

            return;
        }

        const maxTuition = Math.max(
            ...favorites.map(item => Number(item.tuition)),
            1
        );

        section.innerHTML = `
            <h3>Your university comparison</h3>

            <p class="demo-notice">
                Estimated annual tuition fees — illustrative demonstration values.
            </p>

            <div class="tuition-chart">
                ${favorites.map(item => {
                    const tuition = Number(item.tuition);
                    const width = (tuition / maxTuition) * 100;

                    return `
                        <div class="chart-item">

                            <div class="chart-label">
                                <strong>${escapeHTML(item.university)}</strong>
                                <span>
                                    ${escapeHTML(
                                        countries[String(item.country).toLowerCase()]
                                        || item.country
                                    )}
                                </span>
                            </div>

                            <div class="chart-bar-container">
                                <div
                                    class="chart-bar"
                                    style="width: ${width}%"
                                ></div>
                            </div>

                            <div class="chart-value">
                                €${tuition.toLocaleString("en-IE")} / year
                            </div>

                            <button
                                type="button"
                                class="remove-favorite"
                                data-remove-id="${escapeHTML(item.id)}"
                            >Remove</button>

                        </div>
                    `;
                }).join("")}
            </div>

            <button
                type="button"
                id="stop-comparing"
                class="button button-secondary"
            >Stop Comparing</button>
        `;

        section.querySelectorAll("[data-remove-id]").forEach(button => {
            button.addEventListener("click", () => {
                const updated = getFavorites().filter(
                    item => item.id !== button.dataset.removeId
                );

                saveFavorites(updated);

                renderResults();
                renderComparison();
                renderScholarships();
            });
        });

        section.querySelector("#stop-comparing")
            ?.addEventListener("click", stopComparison);
    }


    form.addEventListener("submit", event => {
        event.preventDefault();

        searchPerformed = true;
        renderResults();
    });


    const resetButton = document.getElementById("reset-search");

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            form.reset();
            searchPerformed = false;

            results.innerHTML = `
                <h3>University results</h3>
                <p>Choose a country and click Search Universities.</p>
            `;
        });
    }


    const startComparingButton = document.getElementById("start-comparing");

    if (startComparingButton) {
        startComparingButton.addEventListener("click", () => {
            compareStarted = true;
            renderComparison();

            document.getElementById("comparison-placeholder")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
        });
    }


    const exploreScholarshipsButton = document.getElementById(
        "explore-scholarships"
    );

    const scholarshipList = document.getElementById("scholarship-list");

    if (exploreScholarshipsButton && scholarshipList) {
        scholarshipList.hidden = true;

        exploreScholarshipsButton.addEventListener("click", () => {
            scholarshipsOpened = true;

            renderScholarships();

            exploreScholarshipsButton.textContent = "Refresh Scholarships";

            scholarshipList.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookies = document.getElementById("accept-cookies");
    const rejectCookies = document.getElementById("reject-cookies");

    if (cookieBanner && acceptCookies) {
        acceptCookies.addEventListener("click", () => {
            cookieBanner.style.display = "none";
        });
    }

    if (cookieBanner && rejectCookies) {
        rejectCookies.addEventListener("click", () => {
            cookieBanner.style.display = "none";
        });
    }

});
