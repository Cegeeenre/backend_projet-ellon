const soap = require("soap");
const http = require("http");
const app = require("express")();
const cors = require("cors");

const service = {
  DistanceService: {
    DistanceServiceSoapPort: {
      distance: function (args) {
        const distance = args.distance;
        const autonomie = args.autonomie;
        const tempschargement = args.tempschargement;
        const vitesse = 130;

        const nbRecharge = distance / autonomie;
        console.log(nbRecharge);
        if (nbRecharge > 1) {
          const tempsRecharge = nbRecharge * tempschargement;
          const result = (distance + tempsRecharge) / vitesse;
          return { distanceResult: result };
        } else {
          const result = distance / vitesse;
          return { distanceResult: result };
        }
      },
    },
  },
};

const wsdl = require("fs").readFileSync("./DistanceService.wsdl", "utf8");

app.use(cors());

soap.listen(app, "/distance", service, wsdl);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

