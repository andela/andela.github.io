---
---

(function($){
    var specialRepos;

    specialRepos = {
        potatoORM: {
            icon: 'vex',
            casedTitle: 'Potato'
        },
        'Na-Emoji': {
            icon: 'odometer',
            casedTitle: 'Na-emoji'
        },
        node: {
            icon: 'messenger',
            casedTitle: 'Node'
        }
    };

    function addRepos(repos) {
        repos = repos || [];

    // Remove repos whose descriptions don't contain #opensource
        var temp_repos = [];

        $.each(repos, function(i, repo){
            if (/#opensource/i.test(repo.description)) {
                temp_repos.push(repo);
            }
        });

        repos = temp_repos;

        // Sort by highest # of watchers.
        repos.sort(function (a, b) {
            if (a.hotness < b.hotness) return 1;
            if (b.hotness < a.hotness) return -1;
            return 0;
        });

        $.each(repos, function (index, repo) {
            addRepo(repo, index);
        });
    }

    function addRepo(repo, index) {
        var specialRepoNameLookup = repo.full_name.substr('andela-cvundi/'.length);

        var specialRepo = specialRepos[specialRepoNameLookup];
        var homepage = repo.homepage || ('/' + specialRepoNameLookup);
        var description = repo.description.replace('#opensource', '');
        var stargazersString = repo.stargazers_count.toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (!specialRepo) {
            var $item = $('<div>').addClass('repo ' + (repo.language || '').toLowerCase());
            var $links = $('<div>').addClass('links');
            var $mainLink = $('<a class="main-link">').attr('href', homepage).text(repo.name);
            var $docsLink = $mainLink.clone().removeClass('main-link').addClass('docs-link').text('Docs');
            var $githubLink = $('<a>').addClass('github-link').attr('repo_full_name', repo.full_name).attr('repo_name', repo.name).attr('href', repo.html_url).html('GitHub');
            $item.append($('<h2>').append($mainLink).append($docsLink).append($githubLink));
            $item.append($('<p>').text(description));
            if (repo.language) {
                $item.append($('<h3 class="languange-text">').text(repo.language));
                $item.append('<div class="languange-indicator" title="' + repo.language + '"></div>');
            }

            $('#repos').append($item);
        } else {
            var $specialRepo = $('' +
                '<div class="thumb-containers" style="background-image: url(/img/' + specialRepo.icon + '-icon.png)">' +
                    '<div id="hidden_element">' +
                        '<div class="image-holder">' +
                            '<img src="/img/' + specialRepo.icon + '-icon.png">' +
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
        }
    }


    // Get JSON data from the data folder containing repo info
    var data = {{ site.data | jsonify }}
    $(function() {
        addRepos(data.repos);
    });

})(jQuery);
