# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
# Alternatively, if you use yarn, uncomment the next line and comment out the previous COPY line
# COPY package.json yarn.lock ./

# Install dependencies
RUN npm install
# If you are using yarn, use this instead:
# RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build your Next.js application
RUN npm run build
# For yarn, use this:
# RUN yarn build

# Expose the port Next.js runs on, by default it's 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
# For yarn, use this:
# CMD ["yarn", "start"]
