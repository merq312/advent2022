use std::fs;

fn part_1(elves: &Vec<Vec<i32>>) {
    let mut sums: Vec<i32> = vec![];

    for elf in elves {
        sums.push(elf.iter().sum());
    }

    println!("{}", sums.iter().max().unwrap());
}

fn part_2(elves: &Vec<Vec<i32>>) {
    let mut sums: Vec<i32> = vec![];

    for elf in elves {
        sums.push(elf.iter().sum());
    }

    sums.sort_by(|a, b| b.cmp(a));

    println!("{}", sums[0] + sums[1] + sums[2]);
}

fn main() {
    let elves = fs::read_to_string("./data.txt")
        .unwrap()
        .trim()
        .split("\n\n")
        .collect::<Vec<&str>>()
        .iter()
        .map(|ea| {
            ea.split('\n')
                .map(|i| i.parse::<i32>().unwrap())
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<Vec<i32>>>();

    part_1(&elves);
    part_2(&elves);
}
