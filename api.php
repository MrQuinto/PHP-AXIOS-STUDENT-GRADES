<?php
    header("Content-Type: application/json");
    $data = json_decode(file_get_contents("php://input"),true);

    $grade1 = $data["gr1"];
    $grade2 = $data["gr2"];
    $grade3 = $data["gr3"];
    $value = ($grade1 + $grade2 + $grade3) / 3;

    switch (true) {

    case $value >= 90:
        $grade = "A";
        break;

    case $value >= 80:
        $grade = "B";
        break;

    case $value >= 70:
        $grade = "C";
        break;

    case $value >= 60:
        $grade = "D";
        break;

    default:
        $grade = "F";
        break;
}

    echo json_encode([
        "average" => $value,
        "grade" => $grade
    ]);

?>