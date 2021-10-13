import axios from "axios";
import { useState } from "react";
import { Button, Image, Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { SRLWrapper } from "simple-react-lightbox";
import { getBase64 } from "../assets/utils/utils";
import { options } from "../assets/utils/utils";
import Layout from "../components/Layout";

const Tires = () => {
  const [preview, setPreview] = useState("");
  const [picture, setPicture] = useState<any>();
  const [previewResult, setPreviewResult] = useState("");
  const [imageInfo, setImageInfo] = useState({ keys: [], values: [] });
  const [loading, setLoading] = useState(false);

  //console.log(process.env.NEXT_PUBLIC_TIRES);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (preview.length === 0) {
      return toast.info("Debes cargar una imagen previamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setPreviewResult("");
    setLoading(true);
    /* let data: FormData;

    if (tiresDetect === "superior") {
      data = new FormData();
      data.append("file", picture);
    } else if (tiresDetect === "lateral") {
      data = new FormData();
      data.append("file", picture2);
    } */

    const imageBase = await getBase64(picture);

    const data = {
      image: imageBase,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${process.env.REACT_APP_IMAGES}/tiresCorte`;

    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      //console.log("http://" + response.data.draw_url);

      //setImageInfo(response.data.image_info);
      console.log(response.data.image_info);
      const keys = Object.keys(response.data.image_info);
      const values = Object.values(response.data.image_info);

      //console.log(keys);
      //console.log(values);

      setImageInfo({ keys: keys, values: values });

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_IMAGES}/returnImage`
        );

        setPreviewResult("data:image/jpg;base64," + response.data);

        //console.log(imageInfo);

        //console.log(keys);
        //console.log(values);

        if (keys.length > 0) {
          toast.success("Detectado correctamente", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.warn("No se ha detectado el objeto", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.log(error);
        toast.warn("Hubo un error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoading(false);
      console.log(previewResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout>
        <div className="screen-contenedor padding">
          <div className="item">
            <form className="centrar" onSubmit={handleSubmit}>
              <h2>Corte Lateral</h2>
              <div className="foto">
                {preview.length > 0 && (
                  <div>
                    <SRLWrapper options={options}>
                      <Image
                        src={preview}
                        alt="Count Photo"
                        className="imagen"
                      ></Image>
                    </SRLWrapper>
                  </div>
                )}
              </div>
              <div className="input">
                <input
                  type="file"
                  onChange={(e) => {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                    setPicture(e.target.files[0]);
                    setPreviewResult("");
                  }}
                />
              </div>
              <Button className="boton" type="submit">
                {loading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    aria-hidden="true"
                    size="sm"
                  />
                ) : (
                  "Detectar"
                )}
              </Button>
            </form>
          </div>
          <div className="item">
            {/* {preview.length > 0 && (
              <Image src={preview} alt="Count Photo"></Image>
            )} */}
            <div className="centrar">
              <h2>Resultado</h2>
              <div className="foto">
                {previewResult.length > 0 && (
                  <div>
                    <SRLWrapper options={options}>
                      <Image
                        src={previewResult}
                        alt="Result Photo"
                        className="imagen"
                      ></Image>
                    </SRLWrapper>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {previewResult && (
          <div>
            <div className="resultado">
              <h2>Resultado</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Objeto detectado</th>
                    <th>Porcentaje coincidencia</th>
                  </tr>
                </thead>
                <tbody>
                  {imageInfo.keys.map((_, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{imageInfo.keys[index]}</td>
                      <td>{(imageInfo.values[index][1] * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Tires;
