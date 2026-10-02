import Season from '../db/models/Seasons.js';

export const addSeasonFromMonth = async (body, date) => {
  const month = Number(date.slice(5, 7));

  const convertMonthToSeason = (month) => {
    if (month === 12 || month === 1 || month === 2) return 'winter';
    if (month === 3 || month === 4 || month === 5) return 'spring';
    if (month === 6 || month === 7 || month === 8) return 'summer';
    if (month === 9 || month === 10 || month === 11) return 'autumn';
  };

  const seasonName = convertMonthToSeason(month);

  const season = await Season.findOne({
    season: seasonName,
  });

  body.season = season._id;
};
