
import style from "./CategorySlider.module.css";
function CategorySlider() {
    return (
      <>
        <div className={` overflow-x-auto ${style.slider_horizontal}`}>
          {Array.from({ length: 30 }, (_, index) => (
            <button key={index} className="border rounded px-2 px-md-2 py-md-1" style={{ display: 'inline-block', marginRight: '10px' }}>
              All {index + 1}
            </button>
          ))}
        </div>
      </>
    );
  }
  
  export default CategorySlider;
  