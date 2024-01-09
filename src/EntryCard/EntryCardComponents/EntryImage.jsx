import PropTypes from "prop-types";

function EntryImage({image, title, index, update, disabled}){
    const imageClass = "entry-image";
    const inputId = "change-image";
    const type = "file";
    const accept= ".png, .jpg, .jpeg"

    const changeImage = (event) => {
        if (event.target.files && event.target.files[0]){
            const file = event.target.files[0]; // first uploaded image
            const reader = new FileReader();
            reader.onloadend = () => {update(index, "image", reader.result);}
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <img
                className={imageClass}
                src={image}
                alt={"Image of " + title}
                onClick={() => document.getElementById(inputId).click()}
            />
            <input id={inputId}
                   type={type}
                   accept={accept}
                   onChange={changeImage}
                   disabled={disabled}
            />
        </>
    );
}

// PropTypes setup
EntryImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    index: PropTypes.any,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

export default EntryImage