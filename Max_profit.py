def max_earnings(n):
    best_earnings = 0
    best_combo = (0, 0, 0)

    for t in range(n // 5 + 1):
        for p in range(n // 4 + 1):
            for c in range(n // 10 + 1):

                total_time = t*5 + p*4 + c*10
                if total_time > n:
                    continue

                time = 0
                earnings = 0

                # Theatres calculations
                for _ in range(t):
                    time += 5
                    earnings += 1500 * (n - time)

                # Pubs calculation
                for _ in range(p):
                    time += 4
                    earnings += 1000 * (n - time)

                # Commercial Parks caluclation
                for _ in range(c):
                    time += 10
                    earnings += 2000 * (n - time)

                if earnings > best_earnings:
                    best_earnings = earnings
                    best_combo = (t, p, c)

    return best_earnings, best_combo


# Input feed
for n in [7, 8, 13]:
    earnings, (t, p, c) = max_earnings(n)
    print(f"Time: {n}")
    print(f"Earnings: ${earnings}")
    print(f"T: {t} P: {p} C: {c}")
    print()