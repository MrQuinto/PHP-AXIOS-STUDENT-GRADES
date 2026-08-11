const num1 = document.getElementById("first");
const num2 = document.getElementById("second");
const num3 = document.getElementById("third")
const btn = document.getElementById("btn");
const answer = document.getElementById("Answer");

btn.addEventListener("click", GetCalcu);

async function GetCalcu() {

    let gr1 = Number(num1.value);
    let gr2 = Number(num2.value);
    let gr3 = Number (num3.value);


    const response = await axios.post ("api.php" , {
        gr1 : gr1,
        gr2 : gr2,
        gr3 : gr3,
    })

    answer.innerText =
        `Average: ${response.data.average} | Grade: ${response.data.grade}`;

}