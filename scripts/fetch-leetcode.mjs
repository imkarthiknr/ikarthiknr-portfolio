// Fetches LeetCode profile stats at build time and writes public/leetcode.json.
// LeetCode's GraphQL API doesn't allow cross-origin browser requests, so the site reads
// this snapshot instead; the daily scheduled deploy keeps it fresh.
// Never fails the build: on any error the previous snapshot is kept.
import { readFile, writeFile } from 'node:fs/promises';

const USERNAME = 'imkarthiknr'; // keep in sync with profile.leetcode in src/data/profile.ts
const OUT = new URL('../public/leetcode.json', import.meta.url);

const query = `query ($u: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $u) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    languageProblemCount { languageName problemsSolved }
    badges { id }
    userCalendar { streak totalActiveDays submissionCalendar }
    tagProblemCounts {
      advanced { tagName problemsSolved }
      intermediate { tagName problemsSolved }
      fundamental { tagName problemsSolved }
    }
  }
  userContestRanking(username: $u) { attendedContestsCount rating globalRanking topPercentage }
  recentAcSubmissionList(username: $u, limit: 6) { id title titleSlug timestamp lang }
}`;

const byDifficulty = (list) =>
  Object.fromEntries(list.map(({ difficulty, count }) => [difficulty.toLowerCase(), count]));

try {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
      'User-Agent': 'Mozilla/5.0 (portfolio-build; +https://ikarthiknr-portfolio.web.app)',
    },
    body: JSON.stringify({ query, variables: { u: USERNAME } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length || !data?.matchedUser) throw new Error(errors?.[0]?.message ?? 'user not found');

  const user = data.matchedUser;
  const tags = Object.values(user.tagProblemCounts).flat();

  // submissionCalendar: { "<unix seconds at UTC midnight>": count }
  const calendar = Object.fromEntries(
    Object.entries(JSON.parse(user.userCalendar.submissionCalendar || '{}')).map(([ts, n]) => [
      new Date(Number(ts) * 1000).toISOString().slice(0, 10),
      n,
    ]),
  );

  const snapshot = {
    username: USERNAME,
    profileUrl: `https://leetcode.com/u/${USERNAME}/`,
    fetchedAt: new Date().toISOString(),
    solved: byDifficulty(user.submitStatsGlobal.acSubmissionNum),
    totals: byDifficulty(data.allQuestionsCount),
    ranking: user.profile.ranking,
    contest: data.userContestRanking
      ? {
          rating: Math.round(data.userContestRanking.rating),
          attended: data.userContestRanking.attendedContestsCount,
          topPercentage: data.userContestRanking.topPercentage,
        }
      : null,
    badges: user.badges.length,
    streak: user.userCalendar.streak,
    activeDays: user.userCalendar.totalActiveDays,
    calendar,
    languages: user.languageProblemCount
      .map((l) => ({ name: l.languageName, solved: l.problemsSolved }))
      .sort((a, b) => b.solved - a.solved),
    topics: tags
      .map((t) => ({ name: t.tagName, solved: t.problemsSolved }))
      .sort((a, b) => b.solved - a.solved)
      .slice(0, 8),
    recent: data.recentAcSubmissionList.map((s) => ({
      title: s.title,
      url: `https://leetcode.com/problems/${s.titleSlug}/`,
      solvedAt: new Date(Number(s.timestamp) * 1000).toISOString(),
      lang: s.lang,
    })),
  };

  await writeFile(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`leetcode: ${snapshot.solved.all} solved, ${Object.keys(calendar).length} active day(s) in calendar`);
} catch (err) {
  const existing = await readFile(OUT, 'utf8').catch(() => null);
  if (existing === null) await writeFile(OUT, 'null\n');
  console.warn(`leetcode: fetch failed (${err.message}); keeping previous snapshot`);
}
