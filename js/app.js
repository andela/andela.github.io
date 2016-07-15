---
---

(function($){
    var specialRepos;

    specialRepos = {
        executer: {
            casedTitle: 'executer',
            type: 'opensource',
            tags: []

        },
        skilltree: {
            casedTitle: 'skilltree',
            type: 'web',
            tags: []
        },
        nkata: {
            casedTitle: 'nkata',
            type: 'mobile',
            tags: []
        }
    };

    function addRepos(repos) {
        repos = repos || [];
    // Remove repos whose descriptions don't contain2 #hubspot-open-source

        var temp_repos = [];

        $.each(repos, function(index, repo){
            if (true) {
                temp_repos.push(repo);
            }
        });

        repos = temp_repos;

        $.each(repos, function (index, repo) {
            addRepo(repo);
        });

    }

    function addRepo(repo) {
        var specialRepoNameLookup = repo.full_name.substr('andela-cvundi/'.length);

        var specialRepo = specialRepos[specialRepoNameLookup];
        var description = repo.description.replace('#opensource', '');

        if (specialRepo) {
            var $specialRepo = $('' +
                '<div class="thumb-containers">' +
                    '<h5 class="tag ' + specialRepo.type + '">' + specialRepo.type + '</h5>' +
                    '<a href="/' + specialRepo.casedTitle + '">' +
                        '<div class="'+ specialRepo.casedTitle +'-image-holder"></div>' +
                    '</a>' +
                    '<div class="card-content">' +
                        '<h2 class="'+ specialRepo.type +'">' + specialRepo.casedTitle + '</h2>' +
                    '</div>' +
                    '<p>' + description + '</p>' +
                    '<p class="tags">'  '</p>'

                    '<div id="hidden_element">' +
                        '<div class="image-holder">' +
                            '<img src="/os-icons/' + specialRepo.icon + '-icon.png">' +
                        '</div>' +
                        '<h4>' + specialRepo.casedTitle + '</h4>' +
                        '<hr>' +
                        '<p>' + description + '</p>' +
                        '<hr>' +
                        '<p><span class="executer-tag">' + specialRepo.casedTitle + '</span> <span class="executer-tag"> mobile </span> <span class="executer-tag"> andela </span></p>' +
                        '<a href="#" class="executer-preview">PREVIEW</a>' +
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
