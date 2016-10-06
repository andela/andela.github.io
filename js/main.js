$(document).ready(function(){
  // var hiddenElement= $("#hidden_element"); //element with hover content
  $(".thumb-containers").mouseover(function(){
    $(this).addClass("foo");
    $(this).children("#hidden_element").show();
  })

  .mouseleave(function () {
    $(this).removeClass("foo");
    $(this).children("#hidden_element").hide();
  });



   function timeDifference(rawTime) {
    var now = new Date();
    var time = new Date( rawTime );
    var diff = now - time;
    var days = Math.floor(diff / 1000 / 60 / (60 * 24));

    var date_diff = new Date( diff );
    var sDate = "";
    if (days !== 0) {
        var years = Math.floor( days / 365 );
        if (years !== 0) {
            sDate += years + " year";
            sDate += (years > 1) ? "s " : " ";
            days = days % 365;
        }

        var months = Math.floor( days / 30 );
        if (months !== 0 ) {
            sDate += months + " month";
            sDate += (months > 1) ? "s " : " ";
        } else if (years === 0) {
            sDate += days + " d "+ date_diff.getHours() + " h";
        }
      } else {
          sDate += date_diff.getHours() + " h " + date_diff.getMinutes() + " min";
      }
      return sDate;
		}

		function timeSinceLastCommit(lastUpdated) {
			var lastUpdate = timeDifference(lastUpdated);
			var text = document.createTextNode(lastUpdate);
			var td = document.getElementById('time-difference');
			td.innerHTML = lastUpdate + ' ' + td.innerHTML;
    }

    function updateRepoName(repo) {
      var reponame = repo.data;
      var last_project_repo = reponame.replace('https://github.com/','').split("/");
      return last_project_repo[0] + '/' + last_project_repo[1];
    }

    function updateContributor(contributor, repo) {
      var contributorText = document.createTextNode(contributor);
      var repoText = document.createTextNode(repo);
      var contributorNode = document.getElementById('contributor');
      var repoNode = document.getElementById('repo');
      contributorNode.href = 'https://github.com/' + contributorText.textContent;
      repoNode.href += repoText.textContent ;
      contributorNode.innerHTML += contributorText.textContent;
      repoNode.innerHTML += updateRepoName(repoText);
    }

	  var options = {
     useEasing : true,
     useGrouping : true,
     separator : ',',
     decimal : '.',
     prefix : '',
     suffix : ''
   };

    var apiURL = 'https://andela-github-server.herokuapp.com/';

	 function fetchData () {
	   var xhr = new XMLHttpRequest();
		 xhr.open('GET', apiURL);
		 xhr.onload = function() {
      var events = JSON.parse(xhr.responseText);
      console.log(events);
			updateContributor(events.last_update_made_by, events.last_updated_link);
    	timeSinceLastCommit(events.last_updated);
			var commitsCount = new CountUp("commitsCount", 0, events.stats.commits, 0, 6, options);
      commitsCount.start();
      var mergedPRsCount = new CountUp("mergedPRsCount", 0, events.stats.merged, 0, 4, options);
      mergedPRsCount.start();
      var projectsCount = new CountUp("projectsCount", 0, events.stats.projects, 0, 2, options);
      projectsCount.start();
      var waypoint = new Waypoint({
      element: document.getElementById('contributions'),
      handler: function(direction) {
				if(direction === 'down' || direction === 'up') {
					commitsCount.reset();
					commitsCount.start();
					mergedPRsCount.reset();
					mergedPRsCount.start();
					projectsCount.reset();
					projectsCount.start();
				}
			},
    	offset: '35%'
    });
		 }
		 xhr.send();
		}
    fetchData();
    setInterval(function() {
		  fetchData ();
		}, 1000 * 60 * 60 );



});
