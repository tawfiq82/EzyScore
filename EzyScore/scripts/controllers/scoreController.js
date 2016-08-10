ezyScoreApp.controller('scoreController', ['$scope', '$http', function ($scope, $http) {

    $scope.overs = 10;
    $scope.wickets = 5;
    $scope.status = 'new';
    $scope.Game = null;

    $scope.startGame = function () {
        $scope.Game = new Game($scope.overs, $scope.wickets);
    }

    $scope.score = function (run) {
        $scope.Game.Score(run, true, false);
    }

    $scope.extra = function (run) {
        $scope.Game.Score(run, false, false);
    }

    $scope.out = function () {
        $scope.Game.Score(0, true, true);
    }

    $scope.undo = function () {
        $scope.Game.Undo();
    }
}]);