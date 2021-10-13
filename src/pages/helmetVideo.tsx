//@typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Button, Image, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { captureVideoFrame } from "../assets/utils/utils";
import { v4 as uuidv4 } from "uuid";
import useDimensions from "react-cool-dimensions";
import { toast } from "react-toastify";

const HelmetVideo = () => {
  /* const [url, setUrl] = useState({ url: "" }); */
  const [player, setPlayer] = useState<ReactPlayer>();
  const [image, setImage] = useState<string>("");
  const [inicio, setInicio] = useState(false);
  const [idImage, setIdImage] = useState("");
  const [video, setVideo] = useState<undefined | string>();

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
    if (video === "" || video === undefined) {
      setInicio(!inicio);
      return toast.info("Debes cargar un video previamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

      const url = `${process.env.REACT_APP_IMAGES}/helmetVideo`;

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
  // eslint-disable-next-line
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
    console.log("heigth : ", height);
  }, [width, height]);

  return (
    <div>
      <Layout>
        <div className="screen-contenedor padding">
          <div className="item">
            <form className="centrar" /* onSubmit={handleSubmit} */>
              <h2>Helmet (Video)</h2>
              {video ? (
                <div ref={observe}>
                  <ReactPlayer
                    ref={(player) => setPlayer(player)}
                    url={video ? video : undefined}
                    //url="https://cdn.rawgit.com/mediaelement/mediaelement-files/4d21a042/big_buck_bunny.mp4"
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
              ) : (
                <div className="play" />
              )}

              <div style={{ width: "90%" }}>
                <div className="input">
                  <input
                    type="file"
                    onChange={(e) => {
                      try {
                        if (URL.createObjectURL(e.target.files[0])) {
                          setVideo(URL.createObjectURL(e.target.files[0]));
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
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

              {image.length > 0 ? (
                <div className="border">
                  <Image
                    src={image}
                    alt="Result Photo"
                    className="imagenV"
                  ></Image>
                </div>
              ) : (
                <div className="play" />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HelmetVideo;
