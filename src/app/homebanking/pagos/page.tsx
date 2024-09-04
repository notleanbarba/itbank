
import "../../assets/styles/sass/responsive.scss";
import "../../global.scss";
import logoCompleto from '../../assets/images/logoCompleto.png';
import logoITBA from '../../assets/images/logoITBA.png';


export default function Pagos() {
  return (
    <>
  <header>
      <div className="logoCompleto">
        <img src={logoCompleto} alt="Logo de Argentarius" width="90px" height="50px" />
      </div>
      <img src={logoITBA} alt="Logo de ITBA" width="90px" height="50px" />
    </header>



    </>
  );
};