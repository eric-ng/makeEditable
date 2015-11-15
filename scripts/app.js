angular.module('make-editable', [
	'ngAnimate'
])

.controller('mainCtrl', [
	'$scope',
	function ($scope) {
		
	}
])

.directive('makeEditable', [
	'$sce',
	function ($sce) {
		return {
			restrict: 'A',
			transclude: true,
			templateUrl: 'templates/makeEditable.html',
			scope: true,
			link: function (scope, element, attributes) {
				scope.editing = false;
				scope.btnText = 'Edit';
				scope.toggleMode = function () {
					scope.editing = !scope.editing;
					if (scope.editing) {
						scope.btnText = 'Save';
					} else {
						scope.btnText = 'Edit';
					}
				}

				scope.resetVideo = function () {
					angular.element(element).pause();
					angular.element(element)[0].currentTime = 0;
					playing = false;
				}

				scope.sources = [];
				function processSources(){
					var sourceTypes = {
						webm: { type: 'video/webm'},
						mp4: { type: 'video/mp4'},
						ogg: { type: 'video/ogg'}
					};
					for (source in sourceTypes) {
						if (attributes.hasOwnProperty(source)) {
							scope.sources.push({
								type: sourceTypes[source].type,
								src: $sce.trustAsResourceUrl(attributes[source])
							});
						}
					}
				}
				processSources();
				scope.width = attributes.width;
				scope.height = attributes.height;
			}
		};
	}
]);