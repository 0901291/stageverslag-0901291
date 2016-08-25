import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const achievements = [
  {
    id: "achievement1",
    content_type: 'achievement',
    title: "Achievement bla 1",
    body: 'Achievement bla bla'
  },
  {
    id: "achievement2",
    content_type: 'achievement',
    title: "Achievement bla 2",
    body: 'Achievement bla bla'
  },
  {
    id: "achievement3",
    content_type: 'achievement',
    title: "Achievement bla 3",
    body: 'Achievement bla bla'
  },
  {
    id: "achievement4",
    content_type: 'achievement',
    title: "Achievement bla 4",
    body: 'Achievement bla bla'
  },
  {
    id: "achievement5",
    content_type: 'achievement',
    title: "Achievement bla 5",
    body: 'Achievement bla bla'
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (achievement) => {
  return replaceAll(achievement.title, ' ', '-');
};

class AchievementApi {
  static getAllAchievements() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], achievements));
      }, delay);
    });
  }

  static saveAchievement(achievement) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAchievementTitleLength = 1;
        if (achievement.title.length < minAchievementTitleLength) {
          reject(`Title must be at least ${minAchievementTitleLength} characters.`);
        }

        if (achievement.id) {
          const existingAchievementIndex = achievements.findIndex(a => a.id == achievement.id);
          achievements.splice(existingAchievementIndex, 1, achievement);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new achievements in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          achievement.id = generateId(achievement);
          achievement.watchHref = `http://www.pluralsight.com/achievements/${achievement.id}`;
          achievements.push(achievement);
        }

        resolve(Object.assign({}, achievement));
      }, delay);
    });
  }

  static deleteAchievement(achievementId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfAchievementToDelete = achievements.findIndex(achievement => {
          achievement.achievementId == achievementId;
        });
        achievements.splice(indexOfAchievementToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default AchievementApi;
