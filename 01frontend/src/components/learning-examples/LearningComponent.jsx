import FirstComponent from './FirstComponent'
import {FifthComponent} from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';

export default function LearningComponent() {
    return (
      <div className="LearningComponent">
        <FirstComponent/> 
        <SecondComponent/>
        <ThirdComponent></ThirdComponent>
        <FifthComponent/>
      </div>
    );
  }