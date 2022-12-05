fn split_me(ea: &str) -> Vec<i32> {
    ea.split("-")
        .map(|ea| ea.parse::<i32>().unwrap())
        .collect::<Vec<i32>>()
}

fn part1(pairs: &Vec<Vec<&str>>) {
    let mut sums = 0;

    for pair in pairs {
        let e1 = split_me(pair[0]);
        let e2 = split_me(pair[1]);
        if e1[0] <= e2[0] && e1[1] >= e2[1] {
            sums += 1;
        } else if e2[0] <= e1[0] && e2[1] >= e1[1] {
            sums += 1;
        }
    }

    println!("{sums}");
}

fn part2(pairs: &Vec<Vec<&str>>) {
    let mut sums = 0;

    for pair in pairs {
        let e1 = split_me(pair[0]);
        let e2 = split_me(pair[1]);
        if !(e1[0] > e2[1]) && !(e1[1] < e2[0]) {
            sums += 1;
        }
    }
    println!("{sums}");
}

fn main() {
    let pairs = include_str!("../data.txt")
        .trim()
        .split("\n")
        .collect::<Vec<&str>>()
        .iter()
        .map(|ea| ea.split(",").collect::<Vec<&str>>())
        .collect::<Vec<Vec<&str>>>();

    part1(&pairs);
    part2(&pairs);
}
