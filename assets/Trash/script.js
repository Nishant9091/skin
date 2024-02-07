(function () {
    const envid = getParameterByName('eid', document.currentScript.src);
    let page_url = window.location.href;

    //Anchor Click
    var link = document.getElementsByTagName("a");
    for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function (e) {
            var data_arr = [];
            var link_url = this.href;
            var link_text = e.target.innerText;
            data_arr.push({ 'page_url': page_url });
            data_arr.push({ 'link_url': link_url });
            data_arr.push({ 'link_text': link_text });
            data_arr.push({ 'event': 'anchor' });
            trackevent(data_arr);
        })
    }

    //Label Click
    var link = document.getElementsByTagName("label");
    for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function (e) {
            var data_arr = [];
            var link_url = this.href;
            var link_text = e.target.innerText;
            data_arr.push({ 'page_url': page_url });
            data_arr.push({ 'link_url': link_url });
            data_arr.push({ 'link_text': link_text });
            data_arr.push({ 'event': 'label' });
            trackevent(data_arr);
        })
    }

    //Button Click
    var link = document.getElementsByTagName("button");
    for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function (e) {
            var data_arr = [];
            var link_url = this.href;
            var link_text = e.target.innerText;
            data_arr.push({ 'page_url': page_url });
            data_arr.push({ 'link_url': link_url });
            data_arr.push({ 'link_text': link_text });
            data_arr.push({ 'event': 'button' });
            trackevent(data_arr);
        })
    }

    window.onload = function () {
        //Check Visitor
        if (getCookie("wbx_device_code") == "") {
            var data_arr = [];
            data_arr.push({ 'link_url': page_url });
            data_arr.push({ 'link_text': 'Page' });
            data_arr.push({ 'event': 'visitor' });
            trackevent(data_arr);
        }

        //Form Submit
        document.querySelectorAll('form').forEach(e => e.addEventListener('submit', formsubmitted));

        //Page Scroll
        document.addEventListener('scroll', function () {
            var h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight';
            var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            percent = percent.toFixed();

            if (numberbetween(percent, 0, 25)) {
                if (getCookie('scrolled') != 25) {
                    setCookie("scrolled", percent, 1);
                    var data_arr = [];
                    data_arr.push({ 'link_url': page_url });
                    data_arr.push({ 'link_text': 'Scroll' });
                    data_arr.push({ 'data': '0-25' });
                    data_arr.push({ 'event': 'scroll' });
                    data_arr.push({ 'percent': percent });
                    trackevent(data_arr);
                }
                return 1;

            }
            if (numberbetween(percent, 26, 50)) {
                if (getCookie('scrolled') != 50) {
                    setCookie("scrolled", percent, 1);
                    var data_arr = [];
                    data_arr.push({ 'link_url': page_url });
                    data_arr.push({ 'link_text': 'Scroll' });
                    data_arr.push({ 'data': '25-49' });
                    data_arr.push({ 'event': 'scroll' });
                    data_arr.push({ 'percent': percent });
                    trackevent(data_arr);
                }
                return 1;
            }
            if (numberbetween(percent, 51, 75)) {
                if (getCookie('scrolled') != 75) {
                    setCookie("scrolled", percent, 1);
                    var data_arr = [];
                    data_arr.push({ 'link_url': page_url });
                    data_arr.push({ 'link_text': 'Scroll' });
                    data_arr.push({ 'data': '50-74' });
                    data_arr.push({ 'event': 'scroll' });
                    data_arr.push({ 'percent': percent });
                    trackevent(data_arr);
                }
                return 1;
            }
            if (numberbetween(percent, 76, 100)) {
                if (getCookie('scrolled') != 100) {
                    setCookie("scrolled", percent, 1);
                    var data_arr = [];
                    data_arr.push({ 'link_url': page_url });
                    data_arr.push({ 'link_text': 'Scroll' });
                    data_arr.push({ 'data': '75-100' });
                    data_arr.push({ 'event': 'scroll' });
                    data_arr.push({ 'percent': percent });
                    trackevent(data_arr);
                }
                return 1;
            }
        });
    }

    function numberbetween(x, min, max) {
        return x == max;
    }

    function formsubmitted(event) {
        var data_arr = [];
        data_arr.push({ 'link_url': page_url });
        data_arr.push({ 'link_text': 'Form' });
        data_arr.push({ 'data': 'Form' });
        data_arr.push({ 'event': 'formsubmit' });
        trackevent(data_arr);
    }

    function trackevent(params) {
        // Set Unique Visitor ID
        checkCookie();

        params.push({ 'config': envid });
        let unique_device = getCookie("wbx_device_code");
        params.push({ 'unique_device': unique_device });

        // let IpAddress = '';
        // fetch('https://ipv4.jsonip.com', { mode: 'cors'} )
        // .then((resp) => resp.json())
        // .then((ip) => {
        //     IpAddress = ip.ip;
        //     console.log(IpAddress.toString());
        //     params.push({'ipaddress': IpAddress.toString()});
        // });

        var http = new XMLHttpRequest();
        var url = 'https://phpstack-770725-3199436.cloudwaysapps.com/collect/';
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {

            }
        }

        var dataJSON = JSON.stringify(params);
        http.send(dataJSON);
    }

    // Functions
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    //Unique Visitor
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        let user = getCookie("wbx_device_code");

        if (user != "") { console.log('User exist: ' + user); }
        else {
            user = uuidv4();
            user = envid + "_" + user;
            // console.log(user);
            if (user != "" && user != null) {
                setCookie("wbx_device_code", user, 30);
            }
        }
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

})()