import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Button, Image, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { captureVideoFrame } from "../assets/utils/utils";
import { v4 as uuidv4 } from "uuid";

const TrackingObject = () => {
  /* const [url, setUrl] = useState({ url: "" }); */
  const [player, setPlayer] = useState<ReactPlayer>();
  const [image, setImage] = useState<string>("");
  const [inicio, setInicio] = useState(false);
  const [idImage, setIdImage] = useState("");

  /* const handlesubmit = async (e) => {
    e.preventDefault();

    if (url.url.length === 0) {
      console.log(2);
      return;
    }
    console.log(1); */

  /* const data = { video: url.url }; */

  /*     try {
      const direccion = `${process.env.NEXT_PUBLIC_TRACKING}`;

      await axios.get(direccion, {
        params: {
          video: url.url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }; */

  /* const handleChange = (e) => {
    setUrl({ ...url, [e.target.name]: e.target.value });
  }; */

  useEffect(() => {
    if (inicio) {
      /*  setTimeout(() => {
        const id = uuidv4();
        setIdImage(id);
      }, 1); */
      saveImage();
    }
    // eslint-disable-next-line
  }, [inicio, idImage]);

  const saveImage = async () => {
    if (player) {
      //console.log(player.getInternalPlayer());
      const frame: any = captureVideoFrame(player.getInternalPlayer());
      //console.log("captured frame", frame);

      const data = { image: frame.dataUri };
      //console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `${process.env.REACT_APP_IMAGES}/antiparraVideo`;

      try {
        const response = await axios.post(url, data, config);
        //console.log(response);

        setImage("data:image/jpg;base64," + response.data);
        const id = uuidv4();
        setIdImage(id);
        //console.log(1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Layout>
        <div className="screen-contenedor padding">
          <div className="item">
            <form className="centrar" /* onSubmit={handleSubmit} */>
              <h2>Tracking Objects (Persons)</h2>
              <div className="foto">
                <div>
                  <ReactPlayer
                    ref={(player) => setPlayer(player)}
                    /* url={Video} */
                    /* url="https://cdn.rawgit.com/mediaelement/mediaelement-files/4d21a042/big_buck_bunny.mp4" */
                    config={{
                      file: {
                        attributes: {
                          crossOrigin: "anonymous",
                        },
                      },
                    }}
                    playing={inicio}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              <Button
                className="boton"
                type="button"
                onClick={() => {
                  setInicio(!inicio);
                }}
              >
                {inicio ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    aria-hidden="true"
                    size="sm"
                  />
                ) : (
                  "Detect"
                )}
              </Button>
            </form>
          </div>
          <div className="item">
            {/* {preview.length > 0 && (
              <Image src={preview} alt="Count Photo"></Image>
            )} */}
            <div className="centrar">
              <h2>Result</h2>

              {image.length > 0 && (
                <div className="foto">
                  <div>
                    <Image
                      src={image}
                      alt="Result Photo"
                      className="imagen"
                    ></Image>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default TrackingObject;
