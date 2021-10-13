import { useState } from "react";
import Layout from "../components/Layout";
import { Image, Button, Table, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { getBase64 } from "../assets/utils/utils";
import { SRLWrapper } from "simple-react-lightbox";
import { options } from "../assets/utils/utils";
import { toast } from "react-toastify";

const Truck: React.FC = (): JSX.Element => {
  const [preview, setPreview] = useState("");
  const [preview2, setPreview2] = useState("");
  const [picture, setPicture] = useState<any>();
  const [picture2, setPicture2] = useState<any>();
  const [previewResult, setPreviewResult] = useState("");
  const [previewResult2, setPreviewResult2] = useState("");
  const [imageInfo, setImageInfo] = useState<any>();
  const [izq, setIzq] = useState<any>([]);
  const [der, setDer] = useState<any>([]);
  const [inputs, setInputs] = useState({ large: 0, fe: 0, wide: 0 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(picture);
    setPreviewResult("");
    setPreviewResult("");

    if (preview.length === 0 || preview2.length === 0) {
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

    if (inputs.fe === 0 || inputs.large === 0 || inputs.wide === 0) {
      return toast.info("Todos los inputs son obligatorios", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setLoading(true);
    const imageBase641 = await getBase64(picture);
    const imageBase642 = await getBase64(picture2);

    console.log(imageBase641);

    //console.log(imageBase641);

    const data = {
      image: imageBase641,
      image2: imageBase642,
      large: inputs.large,
      fe: inputs.fe,
      wide: inputs.wide,
    };
    //console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = process.env.REACT_APP_TRUCK_IMAGES;
    try {
      const response = await axios.post(url, data, config);
      //console.log(response);
      console.log(response.data);
      //console.log(response.data["izq"][0]);

      setImageInfo(response.data);
      setIzq(response.data["izq"]);
      setDer(response.data["der"]);

      let one = process.env.REACT_APP_TRUCK_FIRST;
      let two = process.env.REACT_APP_TRUCK_SECOND;

      const requestOne = axios.get(one);
      const requestTwo = axios.get(two);

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            //console.log(responseOne.data, responseTwo.data);
            setPreviewResult("data:image/jpg;base64," + responseOne.data);
            setPreviewResult2("data:image/jpg;base64," + responseTwo.data);
            toast.success("Detectado correctamente", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // use/access the results
            setLoading(false);
          })
        )
        .catch((errors) => {
          // react on errors.
          console.log(errors);
          toast.warn("Hubo un error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });

      //setPreviewResult("data:image/jpg;base64," + response.data);
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
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Layout>
        <div className="screen-contenedor padding">
          <div className="item">
            <form className="centrar" /* onSubmit={handleSubmit} */>
              <h2>Image (Left)</h2>
              <div className="foto">
                {preview.length > 0 && (
                  <div>
                    <SRLWrapper options={options}>
                      <Image
                        src={preview}
                        alt="image Photo"
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
                    setPreviewResult2("");
                  }}
                />
              </div>
            </form>
          </div>
          <div className="item">
            <form className="centrar" /* onSubmit={handleSubmit} */>
              <h2>Image 2 (Right)</h2>
              <div className="foto">
                {preview2.length > 0 && (
                  <div>
                    <SRLWrapper options={options}>
                      <Image
                        src={preview2}
                        alt="image Photo"
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
                    setPreview2(URL.createObjectURL(e.target.files[0]));
                    setPicture2(e.target.files[0]);
                    setPreviewResult2("");
                    setPreviewResult("");
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="inputs padding">
          <Form.Group className="input-truck">
            <Form.Label>Large</Form.Label>
            <Form.Control
              type="number"
              placeholder="Large"
              name="large"
              value={inputs.large}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="input-truck">
            <Form.Label>Fe</Form.Label>
            <Form.Control
              type="number"
              placeholder="Fe"
              name="fe"
              value={inputs.fe}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="input-truck">
            <Form.Label>Wide</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wide"
              name="wide"
              value={inputs.wide}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <p className="formula">
          {" "}
          Volume : wide * ((large1 + large2) /2) * ((height1 + height2)/2) * fe
        </p>
        <form onSubmit={handleSubmit} className="result">
          <Button type="submit" className="boton">
            {!loading ? (
              "Calculate"
            ) : (
              <Spinner
                animation="border"
                variant="light"
                aria-hidden="true"
                size="sm"
              />
            )}
          </Button>
        </form>

        {imageInfo && setPreviewResult && previewResult2 && (
          <>
            <div className="screen-contenedor padding">
              {/*  <h2>Result</h2> */}
              <div className="item">
                <form className="centrar" /* onSubmit={handleSubmit} */>
                  <h2>Image 1 (Left)</h2>
                  <div className="foto">
                    {previewResult.length > 0 && (
                      <div>
                        <SRLWrapper options={options}>
                          <Image
                            src={previewResult}
                            alt="image Photo"
                            className="imagen"
                          ></Image>
                        </SRLWrapper>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="item">
                <form className="centrar" /* onSubmit={handleSubmit} */>
                  <h2>Image 2 (Right)</h2>
                  <div className="foto">
                    {previewResult2.length > 0 && (
                      <div>
                        <SRLWrapper options={options}>
                          <Image
                            src={previewResult2}
                            alt="image Photo"
                            className="imagen"
                          ></Image>
                        </SRLWrapper>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="resultado">
              <div>
                <h3>Volume : {imageInfo && imageInfo.vl + " m3"} </h3>
              </div>
              <div className="titulo">
                <h2>Image (left)</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Punto</th>
                    <th>Distancia</th>
                  </tr>
                </thead>
                <tbody>
                  {izq &&
                    izq.map((p1, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Punto {index + 1}</td>
                        <td>{p1} mts</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <div className="titulo">
                <h2>Image (Right)</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Punto</th>
                    <th>Distancia</th>
                  </tr>
                </thead>
                <tbody>
                  {der &&
                    der.map((p1, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Punto {index + 1}</td>
                        <td>{p1} mts</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </Layout>
    </div>
  );
};

export default Truck;
