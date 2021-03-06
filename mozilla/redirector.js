//  avoision - Lightweight browser redirector for those who are addicted to the web of ideas
//  Copyright (C) 2017-2019 David Ryack
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published
//  by the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>

const TRACKERS_BY_ROOT = {

    // Google's Urchin Tracking Module
    'utm_': [
        'source',
        'medium',
        'term',
        'campaign',
        'content',
        'name',
        'cid',
        'reader',
        'viz_id',
        'pubreferrer',
        'swu'
    ],

    //no clue - don't care - don't trust 'em
    'rc_': [
        'fifo',
        'col'
    ],

    // Adobe Omniture SiteCatalyst
    'IC': [
        'ID'
    ],

    // Adobe Omniture SiteCatalyst
    'ic': [
        'id'
    ],

    // Hubspot
    '_hs': [
        'enc',
        'mi'
    ],

    // Marketo
    'mkt_': [
        'tok'
    ],

    // MailChimp
    // https://developer.mailchimp.com/documentation/mailchimp/guides/getting-started-with-ecommerce/
    'mc_': [
        'cid',
        'eid'
    ],

    // comScore Digital Analytix?
    // http://www.about-digitalanalytics.com/comscore-digital-analytix-url-campaign-generator
    'ns_': [
        'source',
        'mchannel',
        'campaign',
        'linkname',
        'fee'
    ],

    // Simple Reach
    'sr_': [
        'share'
    ],

    // Vero
    'vero_': [
        'conv',
        'id'
    ],
    // Non-prefixy and 1-offs
    '': [
        // Facebook Click Identifier
        // http://thisinterestsme.com/facebook-fbclid-parameter/
        'fbclid',
        // Google Click Identifier
        'gclid',
        // Some other Google Click thing
        'ocid',
        // Unknown
        'ncid',
        // Unknown
        'nr_email_referer',
        // Generic-ish. Facebook, Product Hunt and others
        'ref',
        // Alibaba-family 'super position model' tracker:
        // https://github.com/newhouse/url-tracking-stripper/issues/38
        'spm',
        // amazon garbage
        'camp',
        'linkId',
        'creative',
        'linkCode',
        'tag',
        // random stuff - appears not to break when cleaned during tests
        'sl',
        'tpl',
        'mp',
        'trkid',
        'unlock',
        'mkt_tok'
    ]
};
const MISC_FOR_CLEANING = [
    "*://*.reddit.com/*"
]; // items we want to handle within the cleaning function

const ViaURLS = [
    "*://*.vice.com/*",
    "*://*.nationalreview.com/*",
    "*://*.newsbusters.org/*",
    "*://*.sfgate.com/*",
    "*://*.huffingtonpost.com/*",
    "*://*.nytimes.com/*",
    "*://*.slate.com/*",
    "*://*.massivelyop.com/*",
    "*://*.washingtonexaminer.com/*",
    "*://*.fortune.com/*",
    "*://*.usatoday.com/*",
    "*://*.redstate.com/*",
    "*://*.sfchronicle.com/*",
    "*://*.bostonherald.com/*",
    "*://*.wired.com/*"
];
const UnvisURLS = [];
const OutlineURLS = [
    "*://*.aclu.org/*",
    "*://*.thecollegefix.com/*",
    "*://*.wbir.com/*"
];
const ArchiveURLS =  [
    "*://*.washingtonpost.com/*",
    "*://*.theatlantic.com/*",
    "*://*.newyork.cbslocal.com/*",
    "*://*.jewishworldreview.com/*",
    "*://*.tvblackbox.com.au/*",
    "*://*.kcentv.com/*",
    "*://*.cjr.org/*",
    "*://*.morningstaronline.co.uk/*",
    "*://*.denverpost.com/*",
    "*://*.bloomberg.com/*",
    "*://*.eurogamer.net/*",
    "*://*.gunsinthenews.com/*",
    "*://*.flagandcross.com/*",
    "*://*.wapo.com/*",
    "*://*.arstechnica.com/*",
    "*://*.buzzfeed.com/*",
    "*://*.pjmedia.com/*",
    "*://*.foxnews.com/*",
    "*://*.heatst.com/*",
    "*://*.dailykos.com/*",
    "*://*.gamespot.com/*",
    "*://*.espn.com/*",
    "*://*.variety.com/*",
    "*://*.abcnews/*",
    "*://*.abc.net.au/*",
    "*://*.ausgamers.com/*",
    "*://*.breitbart.com/*",
    "*://*.dailycaller.com/*",
    "*://*.dailymail.co.uk/*",
    "*://*.independent.co.uk/*",
    "*://*.msnbc.com/*",
    "*://*.nbcnews.com/*",
    "*://*.newyorker.com/*",
    "*://*.returnofkings.com/*",
    "*://*.rollingstones.com/*",
    "*://*.telegraph.co.uk/*",
    "*://*.yahoo.com/news/*",
    "*://*.zerohedge.com/*",
    "*://*.aftonbladet.se/*",
    "*://*.avclub.com/*",
    "*://*.birthmoviesdeath.com/*",
    "*://*.boingboing.net/*",
    "*://*.buzzfeed.com/*",
    "*://*.cracked.com/*",
    "*://*.dailydot.com/*",
    "*://*.dailystormer.is/*",
    "*://*.deadspin.com/*",
    "*://*.destructoid.com/*",
    "*://*.engadget.com/*",
    "*://*.fusion.net/*",
    "*://*.gamasutra.com/*",
    "*://*.gameplanet.co.nz/*",
    "*://*.gamesindustry.biz/*",
    "*://*.gawker.com/*",
    "*://*.gizmodo.com/*",
    "*://*.io9.com/*",
    "*://*.infowars.com/*",
    "*://*.jalopnik.com/*",
    "*://*.jezebel.com/*",
    "*://*.kinja.com/*",
    "*://*.kotaku.com/*",
    "*://*.mediamatters.org/*",
    "*://*.motherjones.com/*",
    "*://*.neogaf.com/*",
    "*://*.newmediarockstars.com/*",
    "*://*.nymag.com/*",
    "*://*.offworld.com/*",
    "*://*.pcauthority.com.au/*",
    "*://*.pcgamer.com/*",
    "*://*.pointandclickbait.com/*",
    "*://*.polygon.com/*",
    "*://*.conservapedia.com/*",
    "*://*.rationalwiki.org/*",
    "*://*.rawstory.com/*",
    "*://*.recode.net/*",
    "*://*.rockpapershotgun.com/*",
    "*://*.salon.com/*",
    "*://*.splinternews.com/*",
    "*://*.takimag.com/*",
    "*://*.theblumpkin.com/*",
    "*://*.thedailybeast.com/*",
    "*://*.thegatewaypundit.com/*",
    "*://*.littlegreenfootballs.com/*",
    "*://*.theguardian.com/*",
    "*://*.themarysue.com/*",
    "*://*.theroot.com/*",
    "*://*.theverge.com/*",
    "*://*.vox.com/*",
    "*://*.wehuntedthemammoth.com/*",
    "*://*.houstonpress.com/*",
    "*://*.sfist.com/*",
    "*://*.laist.com/*",
    "*://*.gothamist.com/*",
    "*://*.worldstarhiphop.com/*",
    "*://*.latimes.com/*",
    "*://*.seattlepi.com/*",
    "*://*.nypost.com/*",
    "*://*.cnn.com/*",
    "*://*.powerlineblog.com/*",
    "*://*.mu.nu/*",
    "*://*.reallifemag.com/*",
    "*://*.jeffro.wordpress.com/*",
    "*://*.avoiceformen.com/*",
    "*://*.hoover.org/*",
    "*://*.sfexaminer.com/*",
    "*://*.campusreform.org/*",
    "*://*.yiannopoulos.net/*",
    "*://*.48hills.org/*",
    "*://*.thefader.com/*",
    "*://*.foxbusiness.com/*",
    "*://*.pagesix.com/*",
    "*://*.jammiewf.com/*",
    "*://*.bigleaguepolitics.com/*",
    "*://*.victorygirlsblog.com/*",
    "*://*.althouse.blogspot.com/*",
    "*://*.classicalvalues.com/*",
    "*://*.businessinsider.com/*",
    "*://*.eastbaytimes.com/*",
    "*://*.xojane.com/*",
    "*://*.cassiuslife.com/*",
    "*://*.yournewswire.com/*",
    "*://*.balkin.blogspot.com/*",
    "*://*.therpgpundit.blogspot.com/*",
    "*://*.townhall.com/*",
    "*://*.spiked-online.com/*",
    "*://*.cnbc.com/*",
    "*://*.theamericanconservative.com/*",
    "*://*.thefederalist.com/*",
    "*://*.hoodline.com/*",
    "*://*.everydayfeminism.com/*",
    "*://*.theothermccain.com/*",
    "*://*.gamesradar.com/*",
    "*://*.newsweek.com/*",
    "*://*.politico.com/*",
    "*://*.americanthinker.com/*",
    "*://*.metalsucks.net/*",
    "*://*.gamerevolution.com/*",
    "*://*.theoutline.com/*",
    "*://*.dictionary.com/*",
    "*://*.thesaurus.com/*",
    "*://*.xkcd.com/*",
    "*://*.clickhole.com/*",
    "*://*.sputniknews.com/*",
    "*://*.mercurynews.com/*",
    "*://*.out.com/*",
    "*://*.thehill.com/*",
    "*://*.vanityfair.com/*",
    "*://*.dailywire.com/*",
    "*://*.dailystar.co.uk/*",
    "*://*.almatcboykin.wordpress.com/*"
];
const archiverDomains = [
    "archive.today",
    "archive.fo",
    "archive.li",
    "archive.vn",
    "archive.md",
    "archive.is",
    "archive.ph"
];

function cleaning(details){
    let url = details.url;

    // deal with reddit
    const redditRegex = new RegExp(/(^http(s)?:\/\/(www\.)?reddit\.com)/);
    const oldRedditRegex = new RegExp(/^http(s)?:\/\/(old\.reddit\.com)/);
    const outRedditRegex = new RegExp(/^http(s)?:\/\/(out\.reddit\.com)/);

    if (url.match(oldRedditRegex)) if (url.endsWith('/')) {
        //console.debug("oldReddit fired)");
        return
    }

    if (url.match(outRedditRegex)) {
        //console.debug("outReddit fired");
        //console.debug(`original url: ${url}`);
        url = stripRedditOutLink(url)
    }

    if (!url.match(oldRedditRegex)) if (url.match(redditRegex)) {
        //console.debug("badReddit can fuck off");
        url = oldReddit(url);
    }

    if(url.endsWith("?singlepage=true")) { return } //do i want this here?

    return cleanUrl(url);
}

// Catch whatever has been produced from TRACKERS_BY_ROOT for cleaning
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // if we're in a mode without cleaning - gtfo
        if(filter_list_state === 1 || filter_list_state === 3) { return }

        return cleaning(details)
    },
    {
        urls: generateTrackerPatternsArray(TRACKERS_BY_ROOT),
        types: ["main_frame"]
    },
    ['blocking']
);

// send directly to archive.is
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        const url = details.url;

        return archiveUrlConstructor(url);
    },
    {
        urls: ArchiveURLS,
        types: ["main_frame"]
    },
    ['blocking'] // don't let the request go until we get back a redirectUrl (or other return in theory)
);

// archive via via.hypothes.is
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        const url = details.url;

        return archiveViaConstructor(url);
    },
    {
        urls: ViaURLS,
        types: ["main_frame"]
    },
    ['blocking']
);

// Commented out until needed
// archive via unv.is
/*chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        var url = details.url;

        return archiveUnvConstructor(url);
    },
    {
        urls: UnvisURLS,
        types: ["main_frame"]
    },
    ['blocking']
);*/

// archive using outline.com
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(filter_list_state === 2 || filter_list_state === 3) { return }
        const url = details.url;

        return outlineConstructor(url);
    },
    {
        urls: OutlineURLS,
        types: ["main_frame"]
    },
    ['blocking']
);

function cleanUrl(url) {
    const strippedUrl = removeTrackersFromUrl(url);

    return { redirectUrl: strippedUrl}
}

function pickArchiver(domains) {
    return domains[Math.floor(Math.random() * domains.length)];
}

function oldReddit(redditUrl) {
    const REDDIT_URL = new RegExp(/(https?:\/\/)(www\.)?(reddit\.com)/);
    return redditUrl.replace(REDDIT_URL, "$1old.$3");
}

function stripRedditOutLink(redditUrl) {
    const REDDIT_URL = new RegExp(/(^https?:\/\/out\.reddit\.com\/.*\??url=)(https?.+?)(&.*)/);
    let intermediateUrl = redditUrl.replace(REDDIT_URL, "$2");
    //console.debug(`intermediate url: ${intermediateUrl}`);
    intermediateUrl = intermediateUrl.replace(/%3A/g, ":");
    //console.debug(`intermediate url: ${intermediateUrl}`);
    let finalUrl = intermediateUrl.replace(/%2F/g, "/");
    //console.debug(`final url: ${finalUrl}`);
    return finalUrl;
}

// build the archive.is request url using via.hypothes.is
function archiveViaConstructor(url) {
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=https://via.hypothes.is/`;
    const finalUrl = archiver + url;

    return { redirectUrl: finalUrl };
}

// build the archive.is request url using unv.is
function archiveUnvConstructor(url) {
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=https://unv.is/`;
    const finalUrl = archiver + url.replace(/(http|https):\/\//, '');

    return { redirectUrl: finalUrl };
}

// SLATED FOR REMOVAL
// build the archive.is request url using outline.com
function archiveOutlineConstructor(url) {
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=https://outline.com/`;
    const finalUrl = archiver + url;

    return { redirectUrl: finalUrl };
}

function outlineConstructor(url) {
    const archiver = 'https://outline.com/';
    const finalUrl = archiver + url;

    return { redirectUrl: finalUrl}
}

// Build the archive.is request url
function archiveUrlConstructor(url){
    const archiver = `https://${pickArchiver(archiverDomains)}/?run=1&url=`;

    // pjmedia crap
    const pjmedia_singlepage = '?singlepage=true'; // avoid the irritating More button
    const pjmediaRegex = new RegExp(/(pjmedia\.com)/); // detect we're on pjmedia site
    if(url.endsWith(pjmedia_singlepage)) {
        return { redirectUrl: archiver + url}
    }
    if(url.match(pjmediaRegex)) { // avoid pjmedia More button bullshit

        return { redirectUrl: archiver + url + pjmedia_singlepage };
    }

    // fallthrough option so to speak - our basic use
    return { redirectUrl: archiver + url };
}

// shamelessly stolen from the excellent https://github.com/newhouse/url-tracking-stripper whose code I've really
// enjoyed

// Go through all the trackers by their root and turn them into a big regex...
const TRACKER_REGEXES_BY_ROOT = {};
for (let root in TRACKERS_BY_ROOT) {
    // Old way, matching at the end 1 or unlimited times.
    // TRACKER_REGEXES_BY_ROOT[root] = new RegExp("((^|&)" + root + "(" + TRACKERS_BY_ROOT[root].join('|') + ")=[^&#]+)", "ig");
    // New way, matching at the end 0 or unlimited times. Hope this doesn't come back to be a problem.
    TRACKER_REGEXES_BY_ROOT[root] = new RegExp(`((^|&)${root}(${TRACKERS_BY_ROOT[root].join('|')})=[^&#]*)`, "ig");
}

// Generate the URL patterns used for webRequest filtering
// https://developer.chrome.com/extensions/match_patterns
function generateTrackerPatternsArray(TRACKERS_BY_ROOT) {
    const array = [];
    for (let root in TRACKERS_BY_ROOT) {
        for (let i=0; i < TRACKERS_BY_ROOT[root].length; i++) {
            array.push( `*://*/*?*${root}${TRACKERS_BY_ROOT[root][i]}=*` );
        }
    }
    for (let i in MISC_FOR_CLEANING) {
        array.push(MISC_FOR_CLEANING[i])
    }
    return array;
}

// Actually strip out the tracking codes/parameters from a URL and return the cleansed URL
function removeTrackersFromUrl(url) {
    if (!url) return url;

    const urlPieces = url.split('?');

    // If no params, nothing to modify
    if (urlPieces.length === 1) {
        return url;
    }

    // Go through all the pattern roots
    for (let root in TRACKER_REGEXES_BY_ROOT) {
        // If we see the root in the params part, then we should probably try to do some replacements
        if (urlPieces[1].indexOf(root) !== -1) {
            urlPieces[1] = urlPieces[1].replace(TRACKER_REGEXES_BY_ROOT[root], '');
        }
    }

    // If we've collapsed the URL to the point where there's an '&' against the '?'
    // then we need to get rid of that.
    while (urlPieces[1].charAt(0) === '&') {
        urlPieces[1] = urlPieces[1].substr(1);
    }

    return urlPieces[1] ? urlPieces.join('?') : urlPieces[0];
}
