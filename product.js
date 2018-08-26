class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0, imgSrc: "", error: null, isLoaded: false, data: []
        };

        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.handleThumbsGallery = this.handleThumbsGallery.bind(this);
    }

    componentDidMount() {
        fetch('content.json')
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        data: data,
                        imgSrc: data[0].images.url1
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    prevSlide() {
        var updatedCount = this.state.slideIndex - 1;
        if (updatedCount < 0) {
            updatedCount = this.state.data.length - 1;
        }
        this.setState({ slideIndex: updatedCount });
        this.setState({ imgSrc: this.state.data[updatedCount].images.url1 });
        this.resetThumbsGallery();
        this.resetTab(true);
    }

    nextSlide() {
        var updatedCount = this.state.slideIndex + 1;
        if (updatedCount >= this.state.data.length) {
            updatedCount = 0;
        }
        this.setState({ slideIndex: updatedCount });
        this.setState({ imgSrc: this.state.data[updatedCount].images.url1 });
        this.resetThumbsGallery();
        this.resetTab(true);
    }

    selectTab(event) {
        var tabName;
        var target = event.target;
        if (target.className == "tab-links" && target.nodeName === "A") {
            tabName = event.target.getAttribute("data-tab");
            this.resetTab();
            document.getElementById(tabName).style.display = "block";
            target.className += " active-tab";
        } else {
            return false;
        }
    }

    resetTab(nextProduct) {
        var tabContent = document.getElementsByClassName("tab-content");
        var tabLinks = document.getElementsByClassName("tab-links");
        for (var i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
            tabLinks[i].className = tabLinks[i].className.replace(" active-tab", "");
        }
        if (nextProduct) {
            tabContent[0].style.display = "block";
            tabLinks[0].classList.add("active-tab");
        }
    }

    handleThumbsGallery(event) {
        var target = event.target;
        var thumbItem = document.getElementsByClassName("thumb__item");
        if (target.classList.contains("thumb__small-img") && target.nodeName === "IMG") {
            this.setState({ imgSrc: target.src });
            for (var i = 0; i < thumbItem.length; i++) {
                thumbItem[i].classList.remove("thumb-active");
            }
            target.parentNode.classList.add("thumb-active");
        }
    }

    resetThumbsGallery() {
        var thumbItem = document.getElementsByClassName("thumb__item");
        for (var i = 0; i < thumbItem.length; i++) {
            thumbItem[i].classList.remove("thumb-active");
        }
        thumbItem[0].classList.add("thumb-active");
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loader"></div>;
        } else {
            var n = this.state.slideIndex;
            var ratingValue = data[n].rating.ratingValue;
            var itemRating = [];
            var page = "";

            if (this.state.slideIndex < 9) {
                page = "0" + (this.state.slideIndex + 1);
            } else {
                page = this.state.slideIndex + 1;
            }

            for (var i = 0; i < ratingValue; i++) {
                itemRating.push(<li className="product__rating--rated"></li>);
            }

            while (itemRating.length !== 5) {
                itemRating.push(<li className="product__rating--not-rated"></li>);
            }

            return (
                <div style={{ height: 'inherit' }}>
                    <div className="product-slide">
                        <div className="surfboards__thumbs">
                            <div className="thumbs__container">
                                <div className="thumb__large">
                                    <img id="largeImg-0" className="thumb__large-img" src={this.state.imgSrc} alt="Board" />
                                </div>
                                <ul className="thumb__items" onClick={this.handleThumbsGallery}>
                                    <li className="thumb__item thumb-active">
                                        <img className="thumb__small-img" src={data[n].images.url1} alt="Board" />
                                    </li>
                                    <li className="thumb__item">
                                        <img className="thumb__small-img" src={data[n].images.url2} alt="Board" />
                                    </li>
                                    <li className="thumb__item">
                                        <img className="thumb__small-img" src={data[n].images.url3} alt="Board" />
                                    </li>
                                    <li className="thumb__item">
                                        <img className="thumb__small-img" src={data[n].images.url4} alt="Board" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="surfboards__product">
                            <p className="bg-text bg-text-sufrboards">Boards</p>
                            <h3 className="product__title">{data[n].title}</h3>
                            <ul className="product__rating">
                                {itemRating}
                                <li className="product__votes">({data[n].rating.ratingSum})</li>
                            </ul>
                            <div className="tab-box" onClick={this.selectTab}>
                                <a className="tab-links active-tab" data-tab="description">Description</a>
                                <a className="tab-links" data-tab="features">Features</a>
                                <a className="tab-links" data-tab="dimensions">Dimensions</a>
                            </div>

                            <div id="description" className="tab-content" style={{ display: 'block' }}>
                                <p className="tab-content__text">{data[n].description}</p>
                            </div>

                            <div id="features" className="tab-content">
                                <p className="tab-content__text">{data[n].features}</p>
                            </div>

                            <div id="dimensions" className="tab-content">
                                <p className="tab-content__text">{data[n].dimensions}</p>
                            </div>
                            <p className="product__price">{"$" + Number(data[n].price).toFixed(2)}</p>
                            <a className="btn product__buy-btn" href="#">Buy now</a>
                            <p className="product__view-all">
                                <a href="#" className="link">View all boards</a>
                            </p>
                        </div>
                    </div>
                    <div className="product__slide-buttons">
                        <div className="product__prev-button" title="Previous" onClick={this.prevSlide}></div>
                        <div className="product__next-button" title="Next" onClick={this.nextSlide}></div>
                    </div>
                    <div className="product__slide-page">{page}/{this.state.data.length}</div>
                </div>
            );
        }
    }
}


ReactDOM.render(
    <Product />,
    document.getElementById('root')
);