let timeframe;

function uploadFile() {
    if (timeframe) {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/mp4, video/webm, video/ogg';
        input.onchange = () => {
            let file = input.files[0]; // Get the first selected file
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById("title").innerText = "Motion Extraction";

                    let fileURL = e.target.result;

                    document.getElementById("source-video").src = fileURL;
                    document.getElementById("overlay-video").src = fileURL;
                    document.getElementById("source-video").play();

                    setTimeout(() => {
                        document.getElementById("overlay-video").play();
                    }, timeframe);
                };

                reader.onprogress = function (e) {
                    if (e.lengthComputable) {
                        let percentLoaded = (e.loaded / e.total) * 100;
    
                        // Update the progress element with the percentage loaded
                        document.getElementById("title").innerText = `${percentLoaded.toFixed(2)}%`;
                    }
                }

                reader.readAsDataURL(file); // Read the file as a data URL
            }
        };
        input.click();
    }

    else {
        document.getElementById("timeframe-box").className = "search-box-error";

        setTimeout(() => {
            document.getElementById("timeframe-box").className = "search-box"; 
        }, 1000);
    }
}

function uploadLink() {
    if (timeframe) {
        var url = prompt("URL:");

        if (url.includes("https://www.youtube.com") || url.includes("https://youtu.be")) {
            alert("Downloading or streaming from YouTube is against YouTube Terms of Service. Use a file URL instead.");
        }

        else {
            document.getElementById("source-video").src = url;
            document.getElementById("overlay-video").src = url;
            document.getElementById("source-video").play();

            setTimeout(() => {
                document.getElementById("overlay-video").play();
            }, timeframe);
        }
    }

    else {
        document.getElementById("timeframe-box").className = "search-box-error";

        setTimeout(() => {
            document.getElementById("timeframe-box").className = "search-box"; 
        }, 1000);
    }
}

function setTimeframe() {
    timeframe = document.getElementById("timeframe").value;

    timeframe = timeframe / 1000;
}