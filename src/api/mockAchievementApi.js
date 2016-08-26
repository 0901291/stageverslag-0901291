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

const generateId = (achievement) => {
    return replaceAll(achievement.title, ' ', '-');
};

class AchievementApi {
    static getAllAchievements() {
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], achievements));
        });
    }

    static saveAchievement(achievement) {
        return new Promise((resolve, reject) => {
            const minAchievementTitleLength = 1;
            if (achievement.title.length < minAchievementTitleLength) {
                reject(`Title must be at least ${minAchievementTitleLength} characters.`);
            }

            if (achievement.id) {
                const existingAchievementIndex = achievements.findIndex(a => a.id == achievement.id);
                achievements.splice(existingAchievementIndex, 1, achievement);
            } else {
                achievement.id           = generateId(achievement);
                achievement.content_type = 'achievement';
                achievements.push(achievement);
            }

            resolve(Object.assign({}, achievement));
        });
    }

    static deleteAchievement(achievementId) {
        return new Promise((resolve, reject) => {
            const indexOfAchievementToDelete = achievements.findIndex(achievement => {
                achievement.achievementId == achievementId;
            });
            achievements.splice(indexOfAchievementToDelete, 1);
            resolve();
        });
    }
}

export default AchievementApi;
