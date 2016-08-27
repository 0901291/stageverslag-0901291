const achievements = [
    {
        id: "klantwens",
        content_type: 'achievement',
        title: "Klantwens",
        body: 'De echte wens van de klant in kaart kunt brengen, de \"vraag achter de vraag\".',
        type: 'Analyseren',
        status: 'done',
        references: []
    },
    {
        id: "reflecteren",
        content_type: 'achievement',
        title: "Reflecteren",
        body: 'Kunt reflecteren op eigen handelen en invloed hebt op het ontwikkelproces en daar conclusies uit kunt trekken.',
        type: 'Adviseren',
        status: 'in_progress',
        references: []
    },
    {
        id: "testplan",
        content_type: 'achievement',
        title: "Testplan",
        body: 'Een testplan kunt opstellen.',
        type: 'Ontwerpen',
        status: 'to_do',
        references: []
    },
    {
        id: "usability-test",
        content_type: 'achievement',
        title: "Usability test",
        body: 'Usability tests kunt opzetten en uitvoeren.',
        type: 'Realiseren',
        status: 'to_do',
        references: []
    },
    {
        id: "versiebeheer",
        content_type: 'achievement',
        title: "Versiebeheer",
        body: 'Versiebeheer kunt toepassen in het ontwikkeltraject.',
        type: 'Implementeren',
        status: 'done',
        references: []
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (achievement) => {
    return replaceAll(achievement.title, ' ', '-').toLowerCase();
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

    static deleteAchievement(achievement) {
        return new Promise((resolve, reject) => {
            const indexOfAchievementToDelete = achievements.findIndex(a => {
                a.id == achievement.id;
            });
            achievements.splice(indexOfAchievementToDelete, 1);
            resolve(Object.assign({}, achievement));
        });
    }
}

export default AchievementApi;
