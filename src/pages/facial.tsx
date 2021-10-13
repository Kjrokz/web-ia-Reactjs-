import Layout from "../components/Layout";
import { Button, Image } from "react-bootstrap";
import { useState, useCallback, useEffect, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import axios from "axios";
import WebcamCapture from "react-webcam";
import { v4 as uuidv4 } from "uuid";

const Facial: React.FC = (): JSX.Element => {
  //const [preview, setPreview] = useState("");
  //const [picture, setPicture] = useState<any>();
  const [previewResult, setPreviewResult] = useState("");
  //const [imageInfo, setImageInfo] = useState();
  const [image, setImage] = useState("");
  const [inicio, setInicio] = useState(false);
  const webcamRef = useRef(null);

  //console.log(process.env.NEXT_PUBLIC_COUNTOBJECT);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc === null) {
      //console.log(0);
      return;
    }
    const data = { image: imageSrc };
    //console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${process.env.REACT_APP_WEBCAM}/facial`;
    try {
      const response = await axios.post(url, data, config);
      //console.log(response.data);
      //console.log("http://" + response.data.draw_url);

      setPreviewResult("data:image/jpg;base64," + response.data);
      const id = uuidv4();
      setImage(id);

      //document.getElementById("ItemPreview").src =
      //"data:image/jpg;base64," + response.data;
      //setImageInfo(response.data.image_info);
      //console.log(response.data.image_info);
    } catch (error) {
      console.log(error);
    }
  }, [webcamRef, setImage]);

  const reset = async () => {
    const url = `${process.env.REACT_APP_WEBCAM}/reset`;
    await axios.get(url);
  };

  useEffect(() => {
    //console.log(1);
    if (inicio === true) {
      //console.log(2);
      capture();
    } else {
      setPreviewResult("");
      reset();
    }
    // eslint-disable-next-line
  }, [inicio, image]);

  // eslint-disable-next-line
  const { observe, unobserve, width, height, entry } = useDimensions({
    onResize: ({ observe, unobserve, width, height, entry }) => {
      // Triggered whenever the size of the target is changed...

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
  });

  useEffect(() => {
    console.log("width : ", width);
    console.log("height : ", height);
  }, [width, height]);

  return (
    <div>
      <Layout>
        <div className="screen-contenedor margin">
          <div className="item">
            <div className="centrar" /*  */>
              <h2>Facial</h2>
              {/* <div className="foto">
                {preview.length > 0 && (
                  <div>
                    <ImageonSubmit={handleSubmit}
                      src={preview}
                      alt="Count Photo"
                      className="imagen"
                    ></ImageonSubmit=>
                  </div>
                )}
              </div> */}
              <div
                className="fotoWebcam"
                ref={observe}
                /* style={{
                  width: `${Math.trunc(width)}px`,
                  height: `${Math.trunc(height)}px`,
                }} */
              >
                {width > 0 && height > 0 && (
                  <WebcamCapture
                    audio={false}
                    ref={webcamRef}
                    /* forceScreenshotSourceSize={true}
                    imageSmoothing={true} */
                    //screenshotFormat="image/jpeg"
                    videoConstraints={{
                      width: Math.trunc(width),
                      height: Math.trunc(height),
                      facingMode: "user",
                    }}
                    width={Math.trunc(width)}
                    height={Math.trunc(height)}
                    /* style={{ border: "2px solid teal" }} */
                  />
                )}
              </div>

              {/* <input
                type="file"
                onChange={(e) => {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  setPicture(e.target.files[0]);
                  setPreviewResult("");
                }}
              />
              <Button type="submit">Contar objetos</Button> */}
            </div>
          </div>
          <div className="item">
            {/* {preview.length > 0 && (
              <Image src={preview} alt="Count Photo"></Image>
            )} */}
            <div className="centrar paddingB">
              <h2>Result</h2>
              <div className="fotoWebcam">
                {previewResult.length > 0 && (
                  <div>
                    <Image
                      src={previewResult}
                      alt="Result Photo"
                      className="imagenWebcam"
                      id="ItemPreview"
                      /* width={Math.trunc(width)}
                      height={Math.trunc(height)} */
                    ></Image>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="result">
          <Button
            className="boton boton-margin"
            /* onClick={capture} */ onClick={() => {
              setInicio(!inicio);
              //setPreviewResult("");
            }}
          >
            {inicio ? "Stop" : "Start"}
          </Button>
        </div>

        {/*  <div>
          <h2>Resultado</h2>
        </div>
        <div>
          <Image
            src={image}
            alt="Result Photo"
            className="imagen"
            //id="ItemPreview"
          ></Image>
        </div> */}
      </Layout>
    </div>
  );
};

export default Facial;
