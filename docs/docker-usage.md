### Build the Nest application Docker Image

```shell
   docker build -t image_name:tag_name
```

### Create docker tag

```shell
   docker tag image_name:tag_name dockerhub_repo_name:tag_name
```

### Commit changes to Docker hub

```shell
   docker push dockerhub_repo_name:tag_name
```
