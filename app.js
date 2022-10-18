function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            voldemortHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages:[]
        };       
    },
    computed: {
        voldemortBarStyles() {
            if (this.voldemortHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.voldemortHealth + '%' };  
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
              return { width: "0%" };
            }
            return { width: this.playerHealth + "%" };  
        },
        useSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.voldemortHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                // player lost
                this.winner = 'voldemort';
            }
        },
        voldemortHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
              // draw
                this.winner = 'draw';
            } else if (value <= 0) {
              // voldemort lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.voldemortHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        attackvoldemort() {
            this.currentRound++;
            const attackValue=getRandomValue(5,15);
            this.voldemortHealth -= attackValue;
            this.addLog('player','attack',attackValue);
            this.attackPlayer();
            if (this.playerHealth < 0) {
                //player Lost
            }

        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 18);
            this.playerHealth -= attackValue;
            this.addLog("voldemort", "attack", attackValue);
        },
        specialAttackvoldemort() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.voldemortHealth -= attackValue;
            this.addLog("player", "attack", attackValue);
            this.attackPlayer();
            

        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(10, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLog("player", "heal", healValue);
            this.attackPlayer();
        },  
        surrender() {
            this.winner = 'voldemort';
        },
        addLog(who,what,value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue:value
            });
        }
    }
});
app.mount('#game');