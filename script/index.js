const createElements = (arr) => {
    const htmlElements = arr.map((e1) => `<span class="btn">${e1}</span>`);
    return htmlElements.join(" ");
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data));
};

const removeActive = () => {
    lessonButtons = document.querySelectorAll(".lesson-btn");
    //console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            //console.log(clickBtn);
            clickBtn.classList.add("active");
            displayLoadLevelWord(data.data);
        });
};

const loadWordDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((details) => displayWord(details.data));
};

const displayWord = (word) => {
    console.log(word);
    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML = `
         <div class="">
                    <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
                </div>

                 <div class="space-y-2">
                    <h2 class="font-bold ">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>

                 <div class="space-y-2">
                    <h2 class="font-bold ">Example</h2>
                    <p>${word.sentence}</p>
                </div>

                 <div class="">
                    <h2 class="font-bold ">Synonym</h2>
                   <div class="">${createElements(word.synonyms)}</div>
                </div>
    `;
    document.getElementById("my_modal_5").showModal();
};

const displayLoadLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
       <div class="text-center col-span-full space-y-5 font-bangla">
                 <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="font-medium text-lg text-gray-500">
                  এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
            </div>
       `;
        return;
    }

    for (let word of words) {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
       
        <div
                class="bg-white rounded-md shadow-sm text-center py-12 px-5 space-y-3"
            >
                <h2 class="font-bold text-xl">${word.word}</h2>
                <p>Meaning / Pronunciation</p>
                <p class="text-xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</p>
                <div class="flex justify-between items-center pt-5">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-sky-100 hover:bg-sky-200">
                        <i class="fa-solid fa-circle-info"></i>
                     </button>
                     <button class="btn bg-sky-100 hover:bg-sky-200">
                        <i class="fa-solid fa-volume"></i>
                     </button>
                 </div>
             </div>
          
        `;
        wordContainer.append(card);
    }
};

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
              <button id="lesson-btn-${lesson.level_no}" onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
              <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
              </button>
      `;
        levelContainer.append(btnDiv);
    }
};
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())
        .then((data) => {
            const allWords = data.data;
            console.log(allWords);
            const filterWords = allWords.filter((word) =>
                word.word.toLowerCase().includes(searchValue),
            );
            displayLoadLevelWord(filterWords);
        });
});
