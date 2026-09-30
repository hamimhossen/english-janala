const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLoadLevelWord(data.data));
};

const displayLoadLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

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
                    <button class="btn bg-sky-100 hover:bg-sky-200">
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
              <button onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
              <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
              </button>
      `;
        levelContainer.append(btnDiv);
    }
};
loadLessons();
