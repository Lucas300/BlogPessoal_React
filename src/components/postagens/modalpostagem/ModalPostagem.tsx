import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';

import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css';

function ModalPostagem() {
    return (
        <>
            <Popup
                className="bg-slate-600"
                trigger={
                    <button className="border rounded px-4 py-2 hover:bg-white hover:text-slate-950">
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                    width: '100%',  
                    maxWidth: '600px', 
                    height: '100%', 
                    maxHeight: '600px', 
                    overflow: 'auto', 
                    marginTop: '60px', 
                    paddingTop: '20px', 
                }}
                overlayStyle={{
                    background: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
                }}
            >
                <div className="w-full h-full flex justify-center items-center">
                    <FormPostagem />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;