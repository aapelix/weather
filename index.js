#!/usr/bin/env node

import chalk from "chalk";
import enquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import welcome from "cli-welcome";
import getLocation from "./lib/getLoc.js";
import getWeather from "./lib/getWeather.js";

const args = process.argv;
const input = args[2];
const params = args.slice(3, args.length);

if (input) {
  welcome({
    title: "weather",
    tagLine: `by aapelix`,
    version: "1.0.2",
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
    title: "weather",
    tagLine: `by aapelix`,
    description: `For help use 'w help'`,
    version: "1.0.2",
    bgColor: "#375aef",
    color: "#000000",
    bold: true,
    clear: false,
  });
}

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
