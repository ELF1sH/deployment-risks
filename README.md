## Prerequisites

`kubectl` and `minikube` must be installed

## K8s

1. `minikube start`
2. `minikube addons enable ingress` (аддон нужен для роутинга внутри кластера + для доступа к подам извне)
3. `minikube dashboard` (запускаем дашбоард)
4. `minikube tunnel` (запускает тоннель, чтобы к подам можно было стучаться извне)
5. `docker-compose build`
6. move images inside minikube
   1. `docker image ls`
   2. `minikube image ls`
   3. `minikube image load deployment-risks-frontend`
   4. `minikube image load deployment-risks-backend`
   5. `minikube image load mongo`
7. `kubectl apply -f .` (одной командой запускаем все yaml-файлы для k8s внутри корня проекта)
8. `echo -e "127.0.0.1 frontend.localhost\n127.0.0.1 backend.localhost" | sudo tee -a /etc/hosts` (обновляем `/etc/hosts`, чтобы стучаться к подам извне)