'use strict';

(function () {
    const versionSelect = document.querySelector('#gdoc_version_select');

    document.addEventListener('DOMContentLoaded', function (event) {
        getJson('https://meta.t3ddocs.lukasj.org/versions.json', function (data) {
            while (versionSelect.firstChild) {
                versionSelect.firstChild.remove();
            }

            for (const key in data) {
                const opt = document.createElement('option');
                opt.value = data[key];
                opt.innerText = key;
                opt.selected = key === '{{ .Site.Params.t3dversion }}';
                versionSelect.appendChild(opt);
            }
        });

        versionSelect.addEventListener('change', function () {
            window.location = "https://" + versionSelect.value + ".t3ddocs.lukasj.org" + window.location.pathname;
        });
    });

    function fetchErrors(response) {
        if (!response.ok) {
            console.error(response);
            throw Error(response.statusText);
        }
        return response;
    }

    function getJson(src, callback) {
        fetch(src)
            .then(fetchErrors)
            .then(response => response.json())
            .then(json => callback(json))
            .catch(function (error) {
                console.log(error);
            });
    }
})();
