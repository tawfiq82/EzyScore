function Game(overs, wickets) {
    this.Overs = overs;
    this.Wickets = wickets;
    this.Team1 = new Team();
    this.Team2 = new Team();
    this.Innings = 1;
    this.Winner = null;
    

    this.Score = function (run, isValidBowl, isOut) {

        if (this.Innings === 1) {
            this.ScoreTeam(this.Team1, run, isValidBowl, isOut);
            this.ChangeInnings();
        } else {
            this.ScoreTeam(this.Team2, run, isValidBowl, isOut);
            this.CheckWinner();
        }
    }

    this.ScoreTeam = function (team, run, isValidBowl, isOut) {
        team.AddRun(run);
        if (isValidBowl)
            team.AddBall();
        if (isOut)
            team.AddWicket();
        else {
            team.PrevWickets = team.Wickets;
        }
    }

    this.ChangeInnings = function () {
        if (this.Innings === 1
           && (this.Team1.Overs === this.Overs || this.Team1.Wickets === this.Wickets))
            this.Innings = 2;
    }

    this.CheckWinner = function () {
        if (this.Innings === 2) {
            if (this.Team2.Runs > this.Team1.Runs) {
                this.Winner = "Team 2";
                this.Innings = 0;
            }

            if (this.Team2.Wickets === this.Wickets
                || this.Team2.Overs === this.Overs) {
                if (this.Team1.Runs === this.Team2.Runs) {
                    this.Winner = "Match Drawn";
                } else {
                    this.Winner = "Team 1";
                }
                this.Innings = 0;
            }

        }
    }

    this.Undo = function () {
        if (this.Innings === 1) {
            this.Team1.Undo();
        } else {
            this.Team2.Undo();
        }
    }
}


function Team() {
    this.Overs = 0;
    this.BallsInOver = 0;
    this.Wickets = 0;
    this.Runs = 0;
    this.EnableUndo = false;

    //// previos states
    this.PrevOvers = 0;
    this.PrevBallsInOver = 0;
    this.PrevWickets = 0;
    this.PrevRuns = 0;

    this.AddRun = function (run) {
        this.PrevRuns = this.Runs;
        this.Runs += run;
        this.EnableUndo = true;
    }

    this.AddWicket = function () {
        this.PrevWickets = this.Wickets;
        this.Wickets++;
        this.EnableUndo = true;
    }

    this.AddBall = function () {
        this.PrevBallsInOver = this.BallsInOver;

        if (this.PrevBallsInOver === 0) {
            this.PrevOvers = this.Overs;
        }

        this.BallsInOver++;
        if (this.BallsInOver === 6) {
            this.BallsInOver = 0;
            this.PrevOvers = this.Overs;
            this.Overs++;
        }
        this.EnableUndo = true;
    }

    this.Undo = function () {
        this.Overs = this.PrevOvers;
        this.BallsInOver = this.PrevBallsInOver;
        this.Wickets = this.PrevWickets;
        this.Runs = this.PrevRuns;
        this.EnableUndo = false;
    }
}
