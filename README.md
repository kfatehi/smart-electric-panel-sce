# smart-electric-panel-sce

"Smart" electrical meter with embedded cost accrual computation per time-of-use policy.

Deployed on Unraid as a Docker app, check [blog post](https://www.keyvanfatehi.com/2020/12/15/Smart-Electricity-Meter/) for more verbose information about this project.

## Expectations for Users

Are you trying to use this package? Please consider:

1. Set the URL for your InfluxDB instance in `start.json` 
1. Modify `get_rate.js` to match your energy rate plan.

# build

Build the docker image

`docker build -t studio-electricity-meter .`

# iterate

Mount the app directory so you don't rebuild the image every time you want to test a code change. This way you can execute new code directly from within the container.

`docker run -it --rm --device=/dev/ttyUSB0 -v $PWD/app:/app --name studio-electricity-meter studio-electricity-meter bash`

Once everything is working you can `build` and move on to `install`

# install

The meaning of `install` here just means that your docker daemon by default will manage this container for the rest of its life. So we just execute it with `-d` to daemonize it rather than let its log attach to the working terminal.

`docker run -d --device=/dev/ttyUSB0 --name studio-electricity-meter studio-electricity-meter`

Use your favorite docker management tools to check on it.