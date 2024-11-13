#!/bin/python3

from functools import cache
import sys
from typing import List, Tuple

print("test")

FILE = sys.argv[1] if len(sys.argv) > 1 else "input.txt"
sys.setrecursionlimit(100000)


def read_lines_to_list() -> List[Tuple[List[str], List[int]]]:
    lines: List[str] = []
    with open(FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            [springs, groups] = line.split()
            lines.append((list(springs), [int(val) for val in groups.split(",")]))

    return lines


def count_valid(springs, groups, builder, seen):
    # print(springs, groups, builder)
    if len(groups) == 0:
        if "#" not in springs or len(springs) == 0:
            seen.add(builder + "." * len(springs))
        return
    elif len(springs) == 0:
        if len(groups) == 0 or (len(groups) == 1 and groups[0] == 0):
            seen.add(builder)
        return

    curr = springs[0]
    if curr == "#":
        if groups[0] == 0:
            return
        else:
            groups[0] -= 1
            return count_valid(springs[1:], groups, builder + "#", seen)
    elif curr == ".":
        if groups[0] == 0:
            return count_valid(springs[1:], groups[1:], builder + ".", seen)
        else:
            if builder and builder[-1] == "#" and groups[0] != 0:
                pass
            else:
                return count_valid(springs[1:], groups, builder + ".", seen)
    elif curr == "?":
        count_valid(["#"] + springs[1:], groups[:], builder, seen)
        count_valid(["."] + springs[1:], groups[:], builder, seen)
        return


def part_one():
    lines = read_lines_to_list()
    answer = 0

    for springs, groups in lines:
        valid = set()
        count_valid(springs[:], groups[:], "", valid)
        print(len(valid))
        answer += len(valid)

    print(f"Part 1: {answer}")


@cache
def count_valid_cached(springs: str, groups: Tuple[int]):
    if len(springs) == 0:
        if len(groups) == 0:
            return 1
        else:
            return 0

    curr = springs[0]
    if curr == "#":
        if len(groups) == 0 or len(springs) < groups[0]:
            return 0

        if "." in springs[0 : groups[0]]:
            return 0

        if springs[groups[0] :].startswith("#"):
            return 0

        if len(springs) > groups[0]:
            if springs[groups[0]] == "?":
                return count_valid_cached(springs[groups[0] + 1 :].lstrip("."), groups[1:])

        return count_valid_cached(springs[groups[0] :].lstrip("."), groups[1:])
    elif curr == ".":
        return count_valid_cached(springs.lstrip("."), groups)
    elif curr == "?":
        return count_valid_cached("#" + springs[1:], groups) + count_valid_cached("." + springs[1:], groups)


def part_two():
    lines = read_lines_to_list()
    answer = 0

    for springs, groups in lines:
        big_springs = "?".join(["".join(springs)] * 5)
        big_groups = tuple(groups * 5)
        result = count_valid_cached(big_springs, big_groups)
        answer += result

    print(f"Part 2: {answer}")


part_one()
part_two()