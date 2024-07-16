#!/usr/bin/env node

import chalk from "chalk";
import enquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import welcome from "cli-welcome";
import getPackageJsonInfo from "./utils/getPkg.js";
import getLocation from "./lib/getLoc.js";
import getWeather from "./lib/getWeather.js";

const args = process.argv;
const input = args[2];
const params = args.slice(3, args.length);

const pkg = await getPackageJsonInfo();

if (input) {
  welcome({
    title: pkg.name,
    tagLine: `by aapelix`,
    description: `${pkg.description}`,
    version: pkg.version,
    bgColor: "#375aef",
    color: "#000000",
    bold: true,
    clear: false,
  });

  if (input === "help") {
    console.log(chalk.bgGreen("Lorem ipsum dolor sit amet"));
  } else if (input === "today" || input === "t") {
    const spinner = createSpinner("Getting weather").start();
    await getWeather(spinner);
  }
} else {
  welcome({
    title: pkg.name,
    tagLine: `by aapelix`,
    description: `For help use 'w help'`,
    version: pkg.version,
    bgColor: "#375aef",
    color: "#000000",
    bold: true,
    clear: false,
  });
}

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
