fn get_score(i: i32, j: i32) -> i32 {
    if i == j {
        3 + j + 1
    } else if j == (i + 4) % 3 {
        6 + j + 1
    } else {
        j + 1
    }
}

fn part_1(steps: &Vec<&str>) {
    let mut score = 0;

    for step in steps {
        let i = step.chars().collect::<Vec<char>>()[0] as i32 - 65;
        let j = step.chars().collect::<Vec<char>>()[2] as i32 - 88;

        score += get_score(i, j);
    }

    println!("{score}")
}

fn part_2(steps: &Vec<&str>) {
    let mut score = 0;

    for step in steps {
        let i = step.chars().collect::<Vec<char>>()[0] as i32 - 65;

        let j: i32;
        match step.chars().collect::<Vec<char>>()[2] {
            'X' => j = (i - 1 + 3) % 3,
            'Y' => j = i,
            'Z' => j = (i + 1 + 3) % 3,
            _ => panic!(),
        }

        score += get_score(i, j);
    }

    println!("{score}")
}

fn main() {
    let steps = include_str!("../data.txt")
        .trim()
        .split("\n")
        .collect::<Vec<&str>>();

    part_1(&steps);
    part_2(&steps);
}
