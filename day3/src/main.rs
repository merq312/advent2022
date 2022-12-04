use std::collections::HashSet;

fn get_char_value(c: char) -> i32 {
    if c.is_uppercase() {
        c as i32 - 'A' as i32 + 27
    } else {
        c as i32 - 'a' as i32 + 1
    }
}

fn first(backpacks: &Vec<(&str, &str)>) {
    let mut sums = 0;

    for (first, second) in backpacks {
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
    let context = include_str!("../data.txt").trim().split("\n");

    let backpacks = context
        .clone()
        .map(|ea| ea.split_at(ea.len() / 2))
        .collect::<Vec<(&str, &str)>>();
    first(&backpacks);

    let backpacks = context.collect::<Vec<&str>>();
    second(&backpacks);
}
