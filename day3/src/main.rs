use std::collections::HashSet;

fn get_char_value(c: char) -> i32 {
    if c.is_uppercase() {
        c as i32 - 'A' as i32 + 27
    } else {
        c as i32 - 'a' as i32 + 1
    }
}

fn first(backpacks: &Vec<&str>) {
    let mut sums = 0;

    for bp in backpacks {
        let (first, second) = bp.split_at(bp.len() / 2);
        let mut s1: HashSet<char> = first.chars().collect();
        let s2: HashSet<char> = second.chars().collect();
        s1.retain(|c| s2.contains(c));

        sums += get_char_value(s1.iter().next().unwrap().clone());
    }

    println!("{sums}");
}

fn second(backpacks: &Vec<&str>) {
    let mut bp = backpacks.iter();
    let mut sums = 0;

    loop {
        if let (Some(first), Some(second), Some(third)) = (bp.next(), bp.next(), bp.next()) {
            let mut set: HashSet<char> = first.chars().collect();
            set.retain(|c| second.chars().collect::<HashSet<char>>().contains(c));
            set.retain(|c| third.chars().collect::<HashSet<char>>().contains(c));

            sums += get_char_value(set.iter().next().unwrap().clone());
        } else {
            break;
        }
    }

    println!("{sums}");
}

fn main() {
    let backpacks = include_str!("../data.txt")
        .trim()
        .split("\n")
        .collect::<Vec<&str>>();

    first(&backpacks);
    second(&backpacks);
}
