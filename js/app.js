---
---

(function($){
    var specialRepos;

    specialRepos = {
        executer: {
            casedTitle: 'executer',
            type: 'mobile',
            tags: ['JAVA', 'OBJECTIVE-C', 'FIREBASE', 'ANGULAR', 'NODE']

        },
        skilltree: {
            casedTitle: 'skilltree',
            type: 'web',
            tags: ['JAVASCRIPT', 'FIREBASE', 'ANGULAR', 'NODE', 'GULP', 'OAUTH']
        },
        nkata: {
            casedTitle: 'nkata',
            type: 'opensource',
            tags: ['OPENSOURCE', 'PYTHON']
        }
    };

    function addRepos(repos) {
        repos = repos || [];
    // Remove repos whose descriptions don't contain2 #hubspot-open-source

        var temp_repos = [];

        $.each(repos, function(index, repo){
            if (/#featured/i.test(repo.description)) {
                temp_repos.push(repo);
            }
        });

        repos = temp_repos;

        $.each(repos, function (index, repo) {
            addRepo(repo);
        });

    }

    function addRepo(repo) {
        var specialRepoNameLookup = repo.full_name.substr('andela/'.length);

        var specialRepo = specialRepos[specialRepoNameLookup];
        var description = repo.description.replace('#opensource', '');

        if (specialRepo) {

            var tags = "";
            $.each(specialRepo.tags, function(index, value) {
                tags += '<span>' + value + '</span>';
            });

            var $specialRepo = $('' +
                '<div class="thumb-containers">' +
                    '<h5 class="tag ' + specialRepo.type + '">' + specialRepo.type + '</h5>' +
                    '<a href="/' + specialRepo.casedTitle + '">' +
                        '<div class="'+ specialRepo.casedTitle +'-image-holder"></div>' +
                    '</a>' +
                    '<div class="card-content">' +
                        '<h2 class="'+ specialRepo.type +'">' + specialRepo.casedTitle + '</h2>' +
                        '<p>' + description + '</p>' +
                        '<p class="tags">' + tags + '</p>' +
                        '<a href="/'+ specialRepo.casedTitle +'" class="preview-button">VIEW PRODUCT</a>' +
                    '</div>' +
                '</div>' +
            '');
            $('.thumbnails').append($specialRepo);
        } else {
            // append them to div for not special repos
        }
    }


    // Get JSON data from the data folder containing repo info
    var data = {{ site.data | jsonify }}
    $(function() {
        addRepos(data.repos);
    });

})(jQuery);
