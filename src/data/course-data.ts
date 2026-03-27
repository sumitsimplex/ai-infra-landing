export type Module = {
  id: string;
  title: string;
  duration: string;
  content: string;
};

export type Week = {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  modules: Module[];
};

const content_1_1 = `## What Companies Actually Need (And Why They'll Pay You)

### The Market Right Now

Every company is in one of four stages with AI:

\`\`\`
Stage 1: Experimenting     → Using OpenAI/Claude APIs
Stage 2: Getting Serious   → Fine-tuning models, building RAG
Stage 3: Self-Hosting      → Need to control data, costs, latency  ← YOUR CLIENTS
Stage 4: Scaled Production → Running AI at massive scale           ← YOUR CLIENTS
\`\`\`

**Your sweet spot is Stage 3 and Stage 4.** These companies have decided they need their own infrastructure but don't have the platform engineering skills to build it.

### Why Companies Self-Host AI Models

Understand these motivations deeply — they're your sales pitch:

#### 1. Data Sovereignty & Compliance (40% of buyers)
- **GDPR** — Ireland/EU companies can't send personal data to US-hosted APIs
- **Healthcare (HIPAA)** — patient data must stay within controlled systems
- **Financial services** — regulators require audit trails and data residency
- **Legal** — client confidentiality, attorney-client privilege
- **Government** — classified or sensitive data

**Your talking point:** "Every API call to OpenAI sends your data to their servers. With self-hosted, your data never leaves your cloud."

#### 2. Cost at Scale (30% of buyers)
The API vs self-host crossover point:

\`\`\`
< 10,000 requests/day  → API is cheaper. Don't self-host.
10K - 100K requests/day → Break-even zone. Depends on model size.
> 100K requests/day     → Self-hosting saves 40-70%.
\`\`\`

**The math (Llama 3 70B example):**
- OpenAI GPT-4 equivalent API: ~€0.03/1K tokens → 100K requests/day ≈ €90,000/month
- Self-hosted on 2x A100: ~€6,500/month (on-demand) or ~€2,800/month (spot)
- Savings: €87,000/month → **€1M+/year**

This is the math that makes CTOs pick up the phone.

#### 3. Latency & Performance (20% of buyers)
- API calls add 100-500ms of network latency
- Self-hosted can serve from the same data centre as the app
- Critical for real-time applications: chatbots, code assistants, trading

#### 4. Customisation & Control (10% of buyers)
- Custom fine-tuned models that can't run on APIs
- Specific hardware requirements (e.g., multiple GPUs for large models)
- Integration with internal systems (on-prem databases, legacy APIs)

### The Competitive Landscape

Know who else is in this space:

| Competitor | Their Approach | Your Advantage |
|-----------|----------------|----------------|
| Cloud ML services (SageMaker, Vertex AI) | Managed but expensive, vendor lock-in | You're cloud-agnostic, cheaper at scale |
| MLOps platforms (Anyscale, Modal, Baseten) | Great for startups, but less control | You give full ownership and customisation |
| Big consultancies (Accenture, Deloitte) | Expensive, slow, over-engineered | You're fast, lean, personally accountable |
| Freelancers on Upwork | Cheap but risky, inconsistent quality | You have deep architecture expertise, not just scripting |

**Your positioning:** "I'm the experienced architect who builds it right the first time, hands it off with full documentation, and your team can maintain it independently."

### What You're Actually Selling

Not "Kubernetes consulting." Not "DevOps." Not "AI."

You're selling:

1. **Time** — "2-3 weeks instead of 2-3 months"
2. **Money** — "40-60% cost reduction on GPU spend"
3. **Risk reduction** — "Production-grade from day 1, not a prototype"
4. **Focus** — "Your ML team does ML, not infrastructure"

### The Anatomy of a Typical Engagement

Here's what a real client engagement looks like:

\`\`\`
Day 1-2:    Discovery — understand their workload, constraints, team
Day 3-5:    Architecture design — blueprint, decisions, cost model
Day 6-10:   Infrastructure build — Terraform, K8s, GPU nodes
Day 11-13:  Model serving — vLLM/Triton, health checks, autoscaling
Day 14-15:  Monitoring — Prometheus, Grafana, alerts, Kubecost
Day 16-17:  Gateway — Kong/Envoy, auth, rate limiting
Day 18-19:  Testing — load testing, failure simulation, runbooks
Day 20:     Handoff — documentation, walkthrough, training
\`\`\`

That's 4 weeks of work → €7-11K → and you move to the next client.

---

## Self-Assessment Checkpoint

Before moving on, rate yourself honestly (1-5):

- [ ] I understand why companies self-host AI models: __/5
- [ ] I can explain the cost crossover point with real numbers: __/5
- [ ] I know who my competitors are and how I'm different: __/5
- [ ] I can articulate what I'm selling (not features, but outcomes): __/5

**If anything is below 3, re-read that section. If everything is 3+, move on.**

---

## Homework

1. **Read 5 LinkedIn posts** from people talking about self-hosting LLMs. Note what problems they mention.
2. **Find 3 companies** in Ireland/EU that are hiring ML Platform Engineers. These are your potential clients.
3. **Calculate the API vs self-host cost** for a company doing 50,000 chat requests per day with Llama 3 70B. (Hint: use the numbers above.)

---

Next: [Module 1.2: GPU Deep Dive](module-1.2-gpu-deep-dive.md)`;

const content_1_2 = `## The Economics of GPUs (Know This Cold)

This module is crucial. When a CTO asks "what GPU do we need?", your answer should be instant, specific, and backed by numbers. This is where you earn trust.

### GPU Lineup — What's Available in the Cloud

\`\`\`
┌──────────────────────────────────────────────────────────────────────┐
│ GPU          │ VRAM    │ Best For               │ Cloud Cost (on-demand/hr) │
├──────────────────────────────────────────────────────────────────────┤
│ NVIDIA T4    │ 16 GB   │ Small models, inference │ €0.35-0.50              │
│ NVIDIA L4    │ 24 GB   │ Mid models, inference   │ €0.70-0.90              │
│ NVIDIA A10G  │ 24 GB   │ Mid models, training    │ €1.00-1.50              │
│ NVIDIA A100  │ 40/80GB │ Large models, serious   │ €3.00-4.50              │
│ NVIDIA H100  │ 80 GB   │ Massive models, fastest │ €8.00-12.00             │
│ NVIDIA L40S  │ 48 GB   │ Large models, balanced  │ €2.00-3.00              │
└──────────────────────────────────────────────────────────────────────┘
\`\`\`

### The Golden Rule: VRAM Determines What Models You Can Run

\`\`\`
Model Parameters → Required VRAM (rough guide)

7B  parameters → ~14 GB  (FP16) → T4 or L4 (1 GPU)
13B parameters → ~26 GB  (FP16) → A10G or L40S (1 GPU)
34B parameters → ~68 GB  (FP16) → A100 80GB (1 GPU) or 2x A10G
70B parameters → ~140 GB (FP16) → 2x A100 80GB
70B quantised  → ~35 GB  (AWQ/GPTQ 4-bit) → 1x A100 40GB or L40S
\`\`\`

**This is the single most important table you'll use with clients.**

When a client says "we want to run Llama 3 70B", you immediately know:
- FP16: need 2x A100 80GB → ~€9/hr on-demand, ~€3.50/hr spot
- Quantised (AWQ 4-bit): 1x A100 40GB → ~€3/hr on-demand, ~€1.20/hr spot
- **Monthly cost difference: €4,300 vs €1,750 (spot) — you just saved them €2,500/month with one recommendation**

### Quantisation — Your Secret Weapon for Cost Reduction

Quantisation reduces model precision to shrink VRAM requirements:

\`\`\`
FP16 (default)  → Full precision, full VRAM, best quality
INT8             → ~50% VRAM, ~1-2% quality drop
AWQ/GPTQ (4-bit)→ ~25% VRAM, ~3-5% quality drop
\`\`\`

**When to recommend quantisation:**
- Client cares about cost → always suggest AWQ/GPTQ and let them test quality
- Client cares about max quality (medical, legal) → stick with FP16
- Client is just doing chatbots/support → quantised is fine, they won't notice

### Spot/Preemptible Instances — The 60-70% Discount

Cloud providers sell unused GPU capacity at massive discounts:

| Provider | Name | Discount | Risk |
|----------|------|----------|------|
| GCP | Spot VMs | 60-70% off | Can be reclaimed with 30s notice |
| AWS | Spot Instances | 60-70% off | Can be reclaimed with 2 min notice |
| Azure | Spot VMs | 60-80% off | Can be reclaimed with 30s notice |

**How to use spot safely for inference:**
1. Run multiple replicas across different zones
2. If one spot node gets reclaimed, others handle traffic
3. Use a mix: 1 on-demand (baseline) + N spot (burst capacity)
4. Configure K8s PodDisruptionBudgets to maintain minimum availability

**This is a huge value-add for clients.** Most companies don't do this because they don't know how. You do.

### The Cost Optimisation Framework

When you audit a client's GPU spend, check these (in order of impact):

\`\`\`
1. RIGHT-SIZING            "Are they using A100 when L4 would work?"
   → Potential savings: 50-70%

2. SPOT INSTANCES           "Are they using on-demand for fault-tolerant workloads?"
   → Potential savings: 60-70%

3. AUTOSCALING             "Are GPUs running 24/7 for a daytime workload?"
   → Potential savings: 30-60%

4. QUANTISATION            "Can they use 4-bit instead of FP16?"
   → Potential savings: 50% (by using fewer/smaller GPUs)

5. BATCHING                "Are they sending one request at a time?"
   → Potential savings: 2-5x throughput on same hardware

6. RESERVED INSTANCES      "For stable baseline load, commit for 1-3 years"
   → Potential savings: 30-50% vs on-demand
\`\`\`

Applying all 6 to a client paying €15,000/month in GPU costs:
- Right-size (A100→L4 where possible): €15K → €8K
- Add spot for burst: €8K → €5K
- Add autoscaling (scale to zero overnight): €5K → €3.5K
- **Result: €15K → €3.5K/month = 77% cost reduction**

**This is how you justify your €7-11K engagement fee. You pay for yourself in the first month.**

### GPU Scheduling in Kubernetes

K8s treats GPUs as a schedulable resource, but there are key differences from CPU:

\`\`\`yaml
# GPU resource request — a pod asking for 1 GPU
resources:
  limits:
    nvidia.com/gpu: 1    # GPUs are NOT shareable by default
  requests:
    nvidia.com/gpu: 1    # Request must equal limit for GPUs
\`\`\`

**Important K8s GPU facts:**
- GPUs cannot be shared between pods (by default — MIG on A100/H100 can partition)
- GPU requests MUST equal limits (no overcommit)
- If no GPU is available, the pod waits indefinitely (or until autoscaler adds a node)
- GPU nodes should be tainted to prevent non-GPU workloads from scheduling there

\`\`\`yaml
# Taint on GPU nodes (prevents regular pods from landing here)
taints:
  - key: nvidia.com/gpu
    value: present
    effect: NoSchedule

# Toleration on GPU pods (allows them to schedule on tainted nodes)
tolerations:
  - key: nvidia.com/gpu
    operator: Exists
    effect: NoSchedule
\`\`\`

### Multi-Instance GPU (MIG) — Advanced

A100 and H100 can be partitioned into smaller isolated GPU instances:

\`\`\`
1x A100 80GB can become:
  → 7x 10GB instances (for small models)
  → 3x 20GB instances
  → 2x 40GB instances
  → 1x 80GB instance (no partitioning)
\`\`\`

**When to use MIG:**
- Client runs multiple small models (7B or less)
- Want isolation between models (one can't affect another)
- Want to maximise utilisation of expensive hardware

---

## Self-Assessment Checkpoint

- [ ] I can recommend the right GPU for any model size: __/5
- [ ] I can calculate monthly GPU costs in my head: __/5
- [ ] I can explain quantisation trade-offs to a non-technical CTO: __/5
- [ ] I understand spot instances and how to use them safely: __/5
- [ ] I know the 6-step cost optimisation framework: __/5

---

## Homework

1. **Price out 3 scenarios** using your cloud provider's pricing page:
   - Running Llama 3 8B 24/7 (cheapest option)
   - Running Llama 3 70B quantised, 12 hours/day
   - Running Llama 3 70B FP16, autoscaled 0-3 replicas
2. **Create a one-page GPU recommendation cheat sheet** you can reference on client calls
3. **Research MIG on A100** — read NVIDIA's documentation, understand the partition profiles

---

Next: [Module 1.3: Model Serving Frameworks](module-1.3-model-serving.md)`;

const content_1_3 = `## vLLM vs Triton vs TGI — When to Use What

This is your core technical differentiator. Most companies try to serve models with a basic Flask/FastAPI wrapper. You know better.

### The Problem with DIY Model Serving

What a data scientist typically does:
\`\`\`python
# The "it works on my laptop" approach
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")

@app.post("/generate")
def generate(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_new_tokens=100)
    return tokenizer.decode(outputs[0])
\`\`\`

**Why this is terrible for production:**
- Processes ONE request at a time (no batching)
- No memory management (will OOM with concurrent users)
- No streaming
- No health checks
- No metrics
- Wastes 70-80% of GPU compute

**This is the gap you fill.** You replace this with a proper serving framework.

---

### Framework 1: vLLM (Your Default Choice)

**What it is:** Purpose-built LLM inference engine with continuous batching.

**Key innovation — PagedAttention:**
Traditional serving allocates a fixed block of GPU memory per request. If a request generates fewer tokens than allocated, that memory is wasted. PagedAttention manages memory like an OS manages RAM — in pages, allocated on demand.

**Result:** 3-5x more throughput on the same GPU compared to naive serving.

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    vLLM                             │
├─────────────────────────────────────────────────────┤
│ Throughput      │ 3-5x vs naive, best for LLMs     │
│ Latency         │ Very good (continuous batching)   │
│ API             │ OpenAI-compatible (/v1/chat/...)  │
│ Models          │ LLMs only (text generation)       │
│ Quantisation    │ AWQ, GPTQ, SqueezeLLM            │
│ Multi-GPU       │ Tensor parallelism built-in       │
│ Streaming       │ Yes                               │
│ Ease of use     │ Very easy — single command        │
│ Best for        │ 90% of LLM serving use cases      │
└─────────────────────────────────────────────────────┘
\`\`\`

**Deploy vLLM (one command):**
\`\`\`bash
# Docker
docker run --gpus all \\
  -p 8000:8000 \\
  vllm/vllm-openai:latest \\
  --model meta-llama/Llama-3.1-8B-Instruct \\
  --max-model-len 4096

# Test it (OpenAI-compatible API!)
curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
\`\`\`

**When to recommend vLLM:**
- Client is serving LLMs (chatbots, code gen, summarisation, RAG)
- They want an OpenAI-compatible API (easy migration)
- They need high throughput
- Single-model or a few large models
- **This covers ~90% of your clients**

---

### Framework 2: NVIDIA Triton Inference Server

**What it is:** Multi-framework, multi-model inference server built by NVIDIA.

\`\`\`
┌─────────────────────────────────────────────────────┐
│              Triton Inference Server                │
├─────────────────────────────────────────────────────┤
│ Throughput      │ Very high (dynamic batching)      │
│ Latency         │ Excellent (optimised for NVIDIA)  │
│ API             │ gRPC + HTTP (custom, not OpenAI)  │
│ Models          │ ANY (PyTorch, TF, ONNX, TensorRT) │
│ Multi-model     │ Yes — serve many models at once   │
│ Ensembles       │ Yes — chain models together       │
│ GPU sharing     │ Yes — multiple models on 1 GPU    │
│ Ease of use     │ Complex setup, steep learning curve│
│ Best for        │ Multi-model, non-LLM, enterprise  │
└─────────────────────────────────────────────────────┘
\`\`\`

**When to recommend Triton:**
- Client runs MULTIPLE models (LLM + embedding + classification + vision)
- Client has non-LLM models (image classification, object detection, recommendation)
- Client needs model ensembles (chaining models together)
- Enterprise environment with NVIDIA support contracts
- **~5-10% of your clients**

---

### Framework 3: Text Generation Inference (TGI) by Hugging Face

\`\`\`
┌─────────────────────────────────────────────────────┐
│        Text Generation Inference (TGI)              │
├─────────────────────────────────────────────────────┤
│ Throughput      │ Good (continuous batching)        │
│ Latency         │ Good                              │
│ API             │ HF-compatible + OpenAI-compat     │
│ Models          │ LLMs (HuggingFace models)         │
│ Quantisation    │ GPTQ, AWQ, EETQ, bitsandbytes    │
│ Multi-GPU       │ Yes (tensor parallelism)          │
│ Streaming       │ Yes                               │
│ Ease of use     │ Easy                              │
│ Best for        │ HF ecosystem, if already using HF │
└─────────────────────────────────────────────────────┘
\`\`\`

**When to recommend TGI:**
- Client is deeply embedded in the HuggingFace ecosystem
- They want tight integration with HF Hub, Inference Endpoints
- They're already using TGI and just need it deployed properly
- **Rare — usually vLLM is the better choice**

---

### Decision Matrix (Use This on Client Calls)

\`\`\`
Client says:                          → You recommend:
─────────────────────────────────────────────────────
"We want to serve an LLM"            → vLLM
"We need OpenAI-compatible API"       → vLLM
"We run multiple model types"         → Triton
"We have vision + text models"        → Triton
"We're a HuggingFace shop"           → TGI (or vLLM)
"We need the absolute fastest"        → vLLM with tensor parallelism
"We want NVIDIA support"             → Triton
"We don't know yet"                   → vLLM (safest default)
\`\`\`

---

### Performance Comparison (Real Numbers)

Llama 3 8B on 1x A100 40GB, 128 concurrent users:

\`\`\`
Framework       │ Throughput (tokens/s) │ P99 Latency │ GPU Util
────────────────┼───────────────────────┼─────────────┼──────────
Naive (FastAPI) │ ~200                  │ 12,000ms    │ 35%
TGI             │ ~1,800                │ 850ms       │ 78%
vLLM            │ ~2,400                │ 620ms       │ 88%
Triton+TRT-LLM  │ ~2,800                │ 480ms       │ 92%
\`\`\`

**Takeaway:** vLLM gives you 12x improvement over naive serving with almost zero configuration. Triton+TensorRT is faster but significantly more complex to set up.

---

### The OpenAI-Compatible API (Why It Matters)

vLLM exposes the same API as OpenAI:
\`\`\`
POST /v1/chat/completions
POST /v1/completions
POST /v1/embeddings
GET  /v1/models
\`\`\`

**Why clients love this:**
- Their existing code that calls OpenAI works with ONE change (the base URL)
- They can A/B test: send 50% of traffic to OpenAI, 50% to self-hosted
- Migration is gradual and low-risk
- If self-hosting doesn't work out, they just point back to OpenAI

**This is a massive selling point.** "You won't need to rewrite a single line of application code."

---

## Self-Assessment Checkpoint

- [ ] I can explain PagedAttention in simple terms: __/5
- [ ] I know when to use vLLM vs Triton vs TGI: __/5
- [ ] I can cite throughput improvements with real numbers: __/5
- [ ] I understand why the OpenAI-compatible API matters: __/5

---

## Homework

1. **Run vLLM locally** with a small model (Llama 3 8B or Mistral 7B). If you don't have a GPU locally, use Google Colab (free T4 GPU) or a cheap cloud GPU.
2. **Send 10 concurrent requests** to your vLLM instance and observe GPU utilisation with \`nvidia-smi\`.
3. **Try quantisation** — deploy the same model with AWQ and compare VRAM usage and response quality.
4. **Read the vLLM docs** — specifically the sections on tensor parallelism and speculative decoding.

---

Next: [Module 1.4: K8s for AI Workloads](module-1.4-k8s-for-ai.md)`;

const content_1_4 = `## You Already Know K8s. Here's What Changes for AI.

As a data architect with K8s experience, you know deployments, services, and scaling. This module covers **only the AI-specific patterns** that differ from standard workloads.

---

### 1. GPU Device Plugin

For K8s to see GPUs, you need the NVIDIA device plugin:

\`\`\`bash
# Install (one-time per cluster)
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.3/nvidia-device-plugin.yml
\`\`\`

This runs a DaemonSet that:
- Discovers GPUs on each node
- Registers them as \`nvidia.com/gpu\` resources
- Makes them schedulable by the K8s scheduler

**Verify GPUs are visible:**
\`\`\`bash
kubectl describe node <gpu-node> | grep nvidia.com/gpu
# Should show:
#   nvidia.com/gpu: 1    (allocatable)
\`\`\`

### 2. Health Checks — The #1 Source of Production Failures

**The problem:** A 70B model takes 2-5 minutes to load into GPU memory. Default K8s probes timeout at 30 seconds. Kubernetes kills the pod for being "unhealthy" while it's still loading.

**The fix — use ALL THREE probe types:**

\`\`\`yaml
# STARTUP PROBE — gives the model time to load
startupProbe:
  httpGet:
    path: /health
    port: 8000
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 30    # 30 × 10s = 5 minutes to start
  # K8s won't check liveness/readiness until startup succeeds

# LIVENESS PROBE — restarts pod if it crashes
livenessProbe:
  httpGet:
    path: /health
    port: 8000
  periodSeconds: 30
  failureThreshold: 3
  # Only checked AFTER startup probe succeeds

# READINESS PROBE — removes from service if not ready
readinessProbe:
  httpGet:
    path: /health
    port: 8000
  periodSeconds: 10
  failureThreshold: 3
  # Pod stays in service only while this passes
\`\`\`

**Key insight:** The \`startupProbe\` is the critical one. Without it, liveness probe kills the pod during model loading. This is the #1 mistake you'll fix at every client.

### 3. Node Affinity & Taints — Keeping GPU Nodes Clean

You don't want your monitoring stack or nginx landing on expensive GPU nodes:

\`\`\`yaml
# On GPU nodes — taint them
taints:
  - key: nvidia.com/gpu
    value: present
    effect: NoSchedule

# On AI pods — tolerate the taint
tolerations:
  - key: nvidia.com/gpu
    operator: Exists
    effect: NoSchedule

# Also pin to specific GPU type
nodeSelector:
  gpu-type: nvidia-a100      # Match your node labels
\`\`\`

### 4. Resource Requests — GPUs Are Not Like CPUs

\`\`\`yaml
resources:
  requests:
    nvidia.com/gpu: 1       # MUST equal limits
    cpu: "4"                # Enough CPU to feed the GPU
    memory: "16Gi"          # Model weights + KV cache
  limits:
    nvidia.com/gpu: 1       # Cannot overcommit GPUs
    cpu: "8"
    memory: "32Gi"          # Leave headroom for spikes
\`\`\`

**Rules for GPU pods:**
- GPU requests MUST equal limits (no overcommit)
- Always set CPU and memory too — GPU inference is CPU-bound during tokenisation
- Memory should be 1.5-2x the model size (model weights + KV cache + overhead)

### 5. Autoscaling GPU Workloads

**HPA (Horizontal Pod Autoscaler) won't work out of the box** for GPU workloads because it doesn't understand GPU metrics.

**Option A: KEDA (recommended)**

\`\`\`yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: vllm-scaler
spec:
  scaleTargetRef:
    name: vllm-deployment
  minReplicaCount: 1
  maxReplicaCount: 5
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus:9090
        metricName: gpu_utilization
        query: avg(DCGM_FI_DEV_GPU_UTIL{pod=~"vllm.*"})
        threshold: "70"
  advanced:
    horizontalPodAutoscalerConfig:
      behavior:
        scaleUp:
          stabilizationWindowSeconds: 120
        scaleDown:
          stabilizationWindowSeconds: 300   # Don't scale down too fast
\`\`\`

**Option B: Custom metrics HPA**

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: vllm-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vllm
  minReplicas: 1
  maxReplicas: 5
  metrics:
    - type: Pods
      pods:
        metric:
          name: vllm:requests_running  # vLLM exposes this
        target:
          type: AverageValue
          averageValue: "10"           # Scale when >10 concurrent requests
\`\`\`

**Scale-to-zero (for dev/staging):**
- Use KEDA with \`minReplicaCount: 0\`
- Pod scales to zero when no traffic for 5 minutes
- First request triggers cold start (2-5 min for large models)
- Perfect for saving costs in non-production environments

### 6. Persistent Storage for Model Weights

Models are large (7B = ~14GB, 70B = ~140GB). Don't download them every time a pod starts:

\`\`\`yaml
# PersistentVolumeClaim for model cache
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: model-cache
spec:
  accessModes: [ReadWriteMany]   # Multiple pods can read
  storageClassName: standard-rwx  # Or your CSI driver
  resources:
    requests:
      storage: 200Gi

# Mount in the vLLM deployment
volumes:
  - name: model-cache
    persistentVolumeClaim:
      claimName: model-cache
containers:
  - name: vllm
    volumeMounts:
      - name: model-cache
        mountPath: /root/.cache/huggingface
\`\`\`

**Alternative: Init container to download models**
\`\`\`yaml
initContainers:
  - name: model-downloader
    image: python:3.11-slim
    command:
      - python
      - -c
      - "from huggingface_hub import snapshot_download; snapshot_download('meta-llama/Llama-3.1-8B-Instruct', local_dir='/models')"
    volumeMounts:
      - name: model-cache
        mountPath: /models
    env:
      - name: HF_TOKEN
        valueFrom:
          secretKeyRef:
            name: hf-token
            key: token
\`\`\`

### 7. GPU Monitoring (DCGM Exporter)

\`\`\`bash
# Install DCGM exporter for GPU metrics
helm repo add gpu-helm-charts https://nvidia.github.io/dcgm-exporter/helm-charts
helm install dcgm-exporter gpu-helm-charts/dcgm-exporter \\
  --namespace monitoring --create-namespace
\`\`\`

Key metrics to monitor:
\`\`\`
DCGM_FI_DEV_GPU_UTIL      → GPU compute utilisation (%)
DCGM_FI_DEV_FB_USED       → GPU memory used (MB)
DCGM_FI_DEV_FB_FREE       → GPU memory free (MB)
DCGM_FI_DEV_GPU_TEMP      → Temperature (°C)
DCGM_FI_DEV_POWER_USAGE   → Power consumption (W)
DCGM_FI_DEV_SM_CLOCK      → Streaming multiprocessor clock (MHz)
\`\`\`

**Dashboard you'll build for every client:**
\`\`\`
Row 1: GPU Utilisation (%) | GPU Memory Used (%) | GPU Temperature
Row 2: Inference Throughput (req/s) | P50/P95/P99 Latency | Error Rate
Row 3: Cost per Day | Active Pods | Queue Depth
\`\`\`

### 8. Network Policies for AI Workloads

Lock down GPU pods — they shouldn't be reachable from everywhere:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: vllm-network-policy
  namespace: ai-serving
spec:
  podSelector:
    matchLabels:
      app: vllm
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: gateway       # Only API gateway can reach vLLM
      ports:
        - port: 8000
  egress:
    - to: []                      # Allow outbound (for model downloads)
\`\`\`

---

## Quick Reference: AI vs Standard K8s Workloads

| Aspect | Standard Workload | AI/GPU Workload |
|--------|-------------------|-----------------|
| Resource type | CPU, memory | + nvidia.com/gpu |
| Startup time | Seconds | 2-5 minutes (model loading) |
| Health checks | Default timeouts fine | Must tune for model load time |
| Scaling | CPU/memory based | GPU utilisation or queue depth |
| Storage | Small (<1GB) | Large (10-200GB model weights) |
| Node cost | €0.10-0.50/hr | €3-12/hr per GPU |
| Node sharing | Many pods per node | 1 GPU pod per GPU |
| Spot tolerance | Easy | Requires multi-replica planning |

---

## Self-Assessment Checkpoint

- [ ] I can configure all three K8s probe types for model serving: __/5
- [ ] I understand GPU taints/tolerations and why they matter: __/5
- [ ] I can set up autoscaling for GPU workloads with KEDA: __/5
- [ ] I know how to handle model storage (PVC vs init containers): __/5

---

## Homework

1. **On minikube/kind with GPU passthrough** (or a single cloud GPU node): deploy vLLM and get all three probes working correctly
2. **Deliberately set wrong health check timeouts** — watch what happens when K8s kills pods during model loading. Understand the failure mode.
3. **Install DCGM exporter** and verify GPU metrics appear in Prometheus

---

Next: [Module 1.5: Security & Compliance](module-1.5-security-compliance.md)`;

const content_1_5 = `## The Reason Companies Pay You Premium Prices

Compliance is the #1 reason companies self-host AI. If you understand this deeply, you become indispensable — because most infrastructure engineers don't speak "compliance."

---

### GDPR & The EU AI Act (Your Home Turf)

As Ireland-based, you have a natural advantage here. Irish companies and EU companies **need** someone who understands GDPR in the context of AI.

**Key GDPR requirements for AI infrastructure:**

1. **Data Residency** — personal data must stay within the EU (or adequate jurisdictions)
   - Your pitch: "With self-hosted, your data stays in eu-west-1. Full stop."
   - OpenAI processes data in the US — problematic for EU companies handling PII

2. **Data Processing Agreements (DPAs)** — need contracts with every processor
   - Self-hosted = you ARE the processor, no third-party DPA headaches
   - Client maintains full control

3. **Right to Erasure** — users can request deletion of their data
   - If data was sent to an API provider, can you guarantee deletion?
   - Self-hosted = client controls the full data lifecycle

4. **Data Minimisation** — only process what's necessary
   - Your infrastructure should NOT log full prompts/responses by default
   - Log metadata only: timestamp, token count, latency, model version

**The EU AI Act (coming into force):**
- High-risk AI systems need transparency, documentation, and human oversight
- Self-hosted gives you full audit trail capability
- You can build logging and monitoring that satisfies regulatory requirements

### Architecture for Compliance

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│                    Compliant AI Architecture                  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [User App] → [API Gateway] → [vLLM] → [Response]           │
│                    │                       │                   │
│                    ▼                       ▼                   │
│             [Audit Logger]          [No payload logging]      │
│                    │                                          │
│                    ▼                                          │
│          [Audit Log Store]                                    │
│          (encrypted, retained                                 │
│           per policy, EU region)                              │
│                                                               │
│  Key controls:                                                │
│  ✓ Network policies — pods can't reach internet               │
│  ✓ Encryption at rest (K8s secrets, disk encryption)          │
│  ✓ Encryption in transit (mTLS between services)              │
│  ✓ RBAC — who can access model endpoints                      │
│  ✓ Audit logging — who queried what, when                     │
│  ✓ No PII in logs (redaction layer)                           │
│  ✓ Data residency — everything in EU region                   │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### Security Checklist for Every Deployment

Use this as your standard security review:

#### Infrastructure Layer
- [ ] K8s RBAC configured — least privilege per namespace
- [ ] Pod Security Standards enforced (restricted profile)
- [ ] Network policies — GPU pods only reachable from gateway
- [ ] Secrets in external secrets manager (not K8s secrets)
- [ ] Node OS hardened (CIS benchmarks)
- [ ] K8s audit logging enabled
- [ ] Container images scanned for vulnerabilities
- [ ] No root containers

#### Application Layer
- [ ] API authentication (API keys or OAuth2)
- [ ] Rate limiting per client
- [ ] Input validation (max token length, content filtering)
- [ ] Output filtering (PII detection on responses)
- [ ] No prompt/response payload logging (metadata only)
- [ ] mTLS between services

#### Data Layer
- [ ] Encryption at rest (cloud KMS)
- [ ] Encryption in transit (TLS 1.3)
- [ ] Model weights encrypted at rest
- [ ] HuggingFace tokens in secrets manager, not env vars
- [ ] Backup strategy for model artifacts

#### Operational Layer
- [ ] Incident response plan documented
- [ ] Access audit trail (who accessed what, when)
- [ ] Regular vulnerability scanning
- [ ] Patch management process
- [ ] Break-glass procedure for emergency access

### Industry-Specific Requirements

#### Healthcare (HIPAA — relevant for US clients)
- PHI must be encrypted at rest AND in transit
- Access logging with 6-year retention
- Business Associate Agreement (BAA) required
- Physical security of data centres (cloud providers handle this)

#### Financial Services (PCI-DSS, SOC 2)
- Network segmentation (AI infra in isolated VPC)
- Annual penetration testing
- Change management documentation
- Multi-factor authentication for admin access

#### Legal
- Attorney-client privilege — data CANNOT leave controlled systems
- Document retention policies
- Conflict checking — models can't be trained on one client's data and serve another

### How to Talk About Security on Calls

**Don't lead with features. Lead with risk.**

Bad: "I configure RBAC and network policies."
Good: "I make sure your customer data never touches a system you don't control."

Bad: "I set up encryption at rest."
Good: "If someone steals a hard drive from the data centre, your data is unreadable."

Bad: "I implement audit logging."
Good: "When your compliance team asks 'who accessed the AI system on March 15th?', you'll have the answer in 30 seconds."

---

## Self-Assessment Checkpoint

- [ ] I can explain GDPR implications for AI to a non-technical executive: __/5
- [ ] I know the security checklist by heart: __/5
- [ ] I can architect a compliant AI deployment: __/5
- [ ] I understand industry-specific requirements (healthcare, finance): __/5

---

## Homework

1. **Read the EU AI Act summary** — understand what "high-risk AI system" means
2. **Review your template stack** — go through the security checklist and identify any gaps
3. **Write a one-paragraph security pitch** that you could deliver on a discovery call in 30 seconds

---

Next: [Lab 1: Deploy Llama 3 on Local K8s](labs/lab-1-local-deploy.md)`;

const content_1_6 = `## Objective
Deploy a working LLM on K8s locally, so you've done it end-to-end before touching a client's cloud.

## Prerequisites
- Docker Desktop with K8s enabled (or minikube)
- If you have an NVIDIA GPU locally: nvidia-docker configured
- If no local GPU: we'll use CPU mode for the walkthrough (slow but works), then do the real GPU deployment in Lab 2 on cloud

## Option A: With Local GPU (NVIDIA)

### Step 1: Verify GPU access in Docker
\`\`\`bash
docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi
\`\`\`
You should see your GPU listed.

### Step 2: Create a local K8s namespace
\`\`\`bash
kubectl create namespace ai-lab
\`\`\`

### Step 3: Install NVIDIA device plugin
\`\`\`bash
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.3/nvidia-device-plugin.yml

# Verify
kubectl get pods -n kube-system | grep nvidia
# Wait until it's Running

kubectl get nodes -o json | jq '.items[].status.allocatable["nvidia.com/gpu"]'
# Should show "1" (or however many GPUs you have)
\`\`\`

### Step 4: Deploy a small model with vLLM
\`\`\`yaml
# Save as vllm-local.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm
  namespace: ai-lab
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vllm
  template:
    metadata:
      labels:
        app: vllm
    spec:
      containers:
        - name: vllm
          image: vllm/vllm-openai:latest
          args:
            - "--model"
            - "microsoft/Phi-3-mini-4k-instruct"  # Small model, ~7GB
            - "--max-model-len"
            - "2048"
            - "--gpu-memory-utilization"
            - "0.85"
          ports:
            - containerPort: 8000
          resources:
            limits:
              nvidia.com/gpu: 1
              memory: "16Gi"
            requests:
              nvidia.com/gpu: 1
              memory: "8Gi"
          startupProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 30
            periodSeconds: 10
            failureThreshold: 30
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            periodSeconds: 30
            failureThreshold: 3
---
apiVersion: v1
kind: Service
metadata:
  name: vllm
  namespace: ai-lab
spec:
  selector:
    app: vllm
  ports:
    - port: 8000
      targetPort: 8000
  type: ClusterIP
\`\`\`

\`\`\`bash
kubectl apply -f vllm-local.yaml

# Watch it start (will take a few minutes to download + load model)
kubectl logs -f deployment/vllm -n ai-lab

# Wait for "Application startup complete" or "Uvicorn running"
\`\`\`

### Step 5: Test it
\`\`\`bash
# Port forward
kubectl port-forward svc/vllm 8000:8000 -n ai-lab &

# List models
curl http://localhost:8000/v1/models | python3 -m json.tool

# Chat
curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "microsoft/Phi-3-mini-4k-instruct",
    "messages": [{"role": "user", "content": "What is Kubernetes?"}],
    "max_tokens": 100
  }' | python3 -m json.tool
\`\`\`

### Step 6: Observe GPU usage
\`\`\`bash
# In another terminal, watch GPU memory and utilisation
watch -n 1 nvidia-smi

# While sending requests, you should see GPU utilisation spike
\`\`\`

---

## Option B: Without Local GPU (CPU-only preview)

If you don't have a local GPU, use this lighter approach to understand the K8s patterns. The real GPU work happens in Lab 2 on cloud.

### Use Ollama on K8s (CPU-friendly)
\`\`\`yaml
# Save as ollama-local.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama
  namespace: ai-lab
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ollama
  template:
    metadata:
      labels:
        app: ollama
    spec:
      containers:
        - name: ollama
          image: ollama/ollama:latest
          ports:
            - containerPort: 11434
          resources:
            requests:
              memory: "4Gi"
              cpu: "2"
            limits:
              memory: "8Gi"
              cpu: "4"
          readinessProbe:
            httpGet:
              path: /
              port: 11434
            initialDelaySeconds: 10
            periodSeconds: 5
          volumeMounts:
            - name: ollama-data
              mountPath: /root/.ollama
      volumes:
        - name: ollama-data
          emptyDir:
            sizeLimit: 20Gi
---
apiVersion: v1
kind: Service
metadata:
  name: ollama
  namespace: ai-lab
spec:
  selector:
    app: ollama
  ports:
    - port: 11434
      targetPort: 11434
\`\`\`

\`\`\`bash
kubectl create namespace ai-lab
kubectl apply -f ollama-local.yaml

# Wait for pod to be ready
kubectl wait --for=condition=ready pod -l app=ollama -n ai-lab --timeout=120s

# Port forward
kubectl port-forward svc/ollama 11434:11434 -n ai-lab &

# Pull a small model
curl http://localhost:11434/api/pull -d '{"name": "phi3:mini"}'

# Test it
curl http://localhost:11434/api/chat -d '{
  "model": "phi3:mini",
  "messages": [{"role": "user", "content": "What is Kubernetes?"}]
}'
\`\`\`

---

## Exercises

### Exercise 1: Break the health checks
Change \`startupProbe.failureThreshold\` to \`2\` and \`periodSeconds\` to \`5\`. Watch what happens. The pod will get killed before the model loads.

\`\`\`bash
# Edit and re-apply
kubectl apply -f vllm-local.yaml
kubectl get events -n ai-lab --sort-by='.lastTimestamp' | tail -20
\`\`\`

You should see events like:
\`\`\`
Warning  Unhealthy  Startup probe failed: connection refused
Normal   Killing    Container vllm failed startup probe, will be restarted
\`\`\`

**This is the exact failure mode you'll fix at every single client.** Fix it back and verify it works.

### Exercise 2: Add resource quotas
\`\`\`yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: gpu-quota
  namespace: ai-lab
spec:
  hard:
    nvidia.com/gpu: "1"    # Max 1 GPU in this namespace
\`\`\`

Try deploying 2 replicas. One should stay Pending. Check \`kubectl describe pod <pending-pod>\` to see the quota error.

### Exercise 3: Clean up
\`\`\`bash
kubectl delete namespace ai-lab
\`\`\`

---

## What You Just Learned

1. How to deploy a model serving framework on K8s
2. How startup/readiness/liveness probes work with model loading
3. What happens when health checks are misconfigured
4. How GPU resources are scheduled in K8s
5. How to test inference via the API

**You've now done what 95% of your prospects are struggling with. The confidence is earned.**

---

Next: [Week 2, Module 2.1: Full Stack Cloud Deploy](../week-2-hands-on/module-2.1-full-stack-deploy.md)`;

const content_2_1 = `## Build the Exact Stack You'll Deliver to Clients

This is the most important module. By the end, you'll have deployed the full production stack on a real cloud — the same thing you'll charge €7-11K for.

---

### Getting Cloud Credits (Free or Cheap)

Before spending money, get free credits:

| Provider | Free Tier / Credits | How to Get |
|----------|-------------------|------------|
| GCP | €300 free credits (new accounts) | cloud.google.com/free |
| AWS | €300 in Activate credits (startups) | aws.amazon.com/activate |
| Azure | €200 free credits (new accounts) | azure.microsoft.com/free |
| Lambda Labs | No free tier but cheapest GPUs (~€0.50/hr for A10) | lambdalabs.com |

**Budget for this lab:** ~€20-50 total (a few hours of GPU time).

---

### The Full Deployment — Step by Step

We'll use GCP/GKE (matches our Terraform templates). Adapt for AWS/EKS if preferred.

### Phase 1: Infrastructure (Terraform)

\`\`\`bash
cd k8s-ai-infra-template/terraform

# Set your project
export PROJECT_ID="your-gcp-project-id"

# Update dev tfvars
sed -i '' "s/CLIENT-PROJECT-ID/\$PROJECT_ID/" environments/dev/terraform.tfvars

# Init and plan
terraform init
terraform plan -var-file=environments/dev/terraform.tfvars

# Review the plan — you should see:
# - 1 GKE cluster
# - 1 system node pool (e2-standard-4)
# - 1 GPU node pool (g2-standard-8 with L4, spot, min 0 max 2)

# Apply
terraform apply -var-file=environments/dev/terraform.tfvars

# Get kubectl credentials
gcloud container clusters get-credentials ai-cluster-dev --region us-central1 --project \$PROJECT_ID
\`\`\`

**Time: ~10 minutes for cluster creation.**

### Phase 2: GPU Drivers & Verification

\`\`\`bash
# Install NVIDIA device plugin
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.3/nvidia-device-plugin.yml

# Wait for GPU nodes to appear (may take 2-3 min for spot node)
kubectl get nodes -l role=gpu-inference -w

# Verify GPU is allocatable
kubectl describe node <gpu-node-name> | grep nvidia
# Should show: nvidia.com/gpu: 1
\`\`\`

### Phase 3: Deploy Model Serving

\`\`\`bash
# Create namespace
kubectl create namespace ai-serving

# Create HuggingFace token secret (if using gated models)
kubectl create secret generic hf-token \\
  --from-literal=token=YOUR_HF_TOKEN \\
  -n ai-serving

# Deploy vLLM via Helm
cd k8s-ai-infra-template/helm

# For L4 (24GB VRAM), use a model that fits:
# Edit ai-serving/values.yaml:
#   model.name: "meta-llama/Llama-3.1-8B-Instruct"
#   resources.limits.nvidia.com/gpu: 1
#   resources.limits.memory: "24Gi"

helm upgrade --install ai-serving ./ai-serving \\
  --namespace ai-serving \\
  --wait --timeout 15m

# Watch the pod start
kubectl logs -f deployment/ai-serving-vllm -n ai-serving

# Wait for "Application startup complete"
\`\`\`

### Phase 4: Test Inference

\`\`\`bash
# Port forward
kubectl port-forward svc/ai-serving-vllm 8000:8000 -n ai-serving &

# Run the test script
cd ../scripts
./test-inference.sh http://localhost:8000
\`\`\`

### Phase 5: Deploy Monitoring

\`\`\`bash
cd ../helm

# Deploy kube-prometheus-stack + Kubecost
helm dependency update ./monitoring
helm upgrade --install ai-monitoring ./monitoring \\
  --namespace monitoring --create-namespace \\
  --wait --timeout 10m

# Install DCGM exporter for GPU metrics
helm repo add gpu-helm-charts https://nvidia.github.io/dcgm-exporter/helm-charts
helm repo update
helm install dcgm-exporter gpu-helm-charts/dcgm-exporter \\
  --namespace monitoring \\
  --set arguments="{-c,5000}"

# Access Grafana
kubectl port-forward svc/ai-monitoring-grafana 3000:80 -n monitoring &
# Open http://localhost:3000 (admin / CHANGE-ME)
\`\`\`

**Build a GPU dashboard:**
1. Go to Grafana → Dashboards → New Dashboard
2. Add panels for:
   - \`DCGM_FI_DEV_GPU_UTIL\` — GPU utilisation
   - \`DCGM_FI_DEV_FB_USED / (DCGM_FI_DEV_FB_USED + DCGM_FI_DEV_FB_FREE)\` — Memory usage %
   - \`DCGM_FI_DEV_GPU_TEMP\` — Temperature
   - \`rate(vllm_request_success_total[5m])\` — Request throughput
   - \`histogram_quantile(0.95, rate(vllm_request_duration_seconds_bucket[5m]))\` — P95 latency

### Phase 6: Deploy API Gateway

\`\`\`bash
helm dependency update ./gateway
helm upgrade --install ai-gateway ./gateway \\
  --namespace gateway --create-namespace \\
  --wait --timeout 5m

# Get the external IP
kubectl get svc -n gateway
# Look for the EXTERNAL-IP of the Kong proxy
\`\`\`

### Phase 7: Load Test

\`\`\`bash
# Install hey (HTTP load tester)
# Mac: brew install hey
# Linux: go install github.com/rakyll/hey@latest

# Warm up
curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta-llama/Llama-3.1-8B-Instruct","messages":[{"role":"user","content":"Hi"}],"max_tokens":50}'

# Load test: 10 concurrent users, 60 seconds
hey -n 100 -c 10 -m POST \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta-llama/Llama-3.1-8B-Instruct","messages":[{"role":"user","content":"What is Kubernetes in one sentence?"}],"max_tokens":50}' \\
  http://localhost:8000/v1/chat/completions

# Watch Grafana during the load test — this is what you'll show clients
\`\`\`

### Phase 8: Clean Up (IMPORTANT — save money!)

\`\`\`bash
# Delete everything
cd ../../terraform
terraform destroy -var-file=environments/dev/terraform.tfvars

# Verify in GCP console that no resources remain
\`\`\`

---

## What You Just Built

\`\`\`
Internet → Kong Gateway → vLLM (GPU) → Response
                              ↓
                         Prometheus → Grafana (dashboards)
                              ↓
                         Kubecost (cost tracking)
\`\`\`

**This is exactly what clients pay €7-11K for.** You just did it in an afternoon.

---

## Document Everything

While it's fresh, write notes on:
1. What took longer than expected?
2. Where did you get stuck?
3. What would you do differently next time?
4. How long did each phase take?

These notes become your delivery playbook and help you estimate timelines for clients.

---

## Screenshot Your Work

Take screenshots of:
- The running pods (\`kubectl get pods -A\`)
- The Grafana GPU dashboard
- The successful inference response
- The load test results

**These become your portfolio / case study content.**

---

Next: [Module 2.2: Monitoring & Observability](module-2.2-monitoring.md)`;

const content_2_2 = `## The Dashboard That Wins Clients

When you show a prospect a screenshot of a GPU monitoring dashboard with real metrics, they go from "who is this person?" to "when can you start?" Monitoring is your most visible deliverable.

---

### The Three Layers of AI Observability

\`\`\`
Layer 1: Infrastructure   → Is the hardware healthy?
Layer 2: Application      → Is the model serving working?
Layer 3: Business         → What does it cost per request?
\`\`\`

### Layer 1: Infrastructure Metrics (DCGM + Node Exporter)

**GPU Metrics (via DCGM Exporter):**

| Metric | What It Means | Alert Threshold |
|--------|--------------|-----------------|
| \`DCGM_FI_DEV_GPU_UTIL\` | % of GPU compute used | > 90% for 5m = warning |
| \`DCGM_FI_DEV_FB_USED\` | GPU memory used (MB) | > 95% = critical |
| \`DCGM_FI_DEV_GPU_TEMP\` | GPU temperature (°C) | > 85°C = critical |
| \`DCGM_FI_DEV_POWER_USAGE\` | Power draw (watts) | > 300W sustained = warning |
| \`DCGM_FI_DEV_ECC_SBE_VOL_TOTAL\` | ECC single-bit errors | > 0 = investigate |
| \`DCGM_FI_DEV_XID_ERRORS\` | GPU XID errors | > 0 = critical (hardware issue) |

**Key Grafana Panels:**

\`\`\`promql
# GPU Utilisation (%)
avg(DCGM_FI_DEV_GPU_UTIL{pod=~".*vllm.*"})

# GPU Memory Usage (%)
100 * sum(DCGM_FI_DEV_FB_USED) / (sum(DCGM_FI_DEV_FB_USED) + sum(DCGM_FI_DEV_FB_FREE))

# GPU Temperature
max(DCGM_FI_DEV_GPU_TEMP)

# GPU Power
sum(DCGM_FI_DEV_POWER_USAGE)
\`\`\`

### Layer 2: Application Metrics (vLLM)

vLLM exposes Prometheus metrics at \`/metrics\`:

\`\`\`promql
# Request throughput (requests/sec)
rate(vllm_request_success_total[5m])

# P50 / P95 / P99 latency
histogram_quantile(0.50, rate(vllm_request_duration_seconds_bucket[5m]))
histogram_quantile(0.95, rate(vllm_request_duration_seconds_bucket[5m]))
histogram_quantile(0.99, rate(vllm_request_duration_seconds_bucket[5m]))

# Active requests (concurrency)
vllm_num_requests_running

# Waiting requests (queue depth)
vllm_num_requests_waiting

# Token throughput (tokens/sec)
rate(vllm_prompt_tokens_total[5m]) + rate(vllm_generation_tokens_total[5m])

# KV cache utilisation
vllm_gpu_cache_usage_perc
\`\`\`

**The key metric to watch:** \`vllm_num_requests_waiting\`
- If this is consistently > 0, you need more replicas
- If this is always 0, you might be over-provisioned (wasting money)

### Layer 3: Business Metrics (Kubecost + Custom)

\`\`\`promql
# Cost per hour (from Kubecost)
sum(node_total_hourly_cost * on(node) group_left() kube_node_labels{label_role="gpu-inference"})

# Cost per request (custom calculation)
# GPU cost per hour / requests per hour
sum(node_total_hourly_cost * on(node) group_left() kube_node_labels{label_role="gpu-inference"})
/
sum(rate(vllm_request_success_total[1h])) * 3600

# Cost per 1K tokens
sum(node_total_hourly_cost * on(node) group_left() kube_node_labels{label_role="gpu-inference"})
/
(sum(rate(vllm_generation_tokens_total[1h])) * 3600 / 1000)
\`\`\`

### Alert Rules

\`\`\`yaml
# Save as alert-rules.yaml and include in your monitoring Helm chart
groups:
  - name: ai-infra-alerts
    rules:
      # GPU is overloaded
      - alert: GPUUtilisationHigh
        expr: avg(DCGM_FI_DEV_GPU_UTIL) > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "GPU utilisation above 90% for 5 minutes — consider scaling up"

      # GPU memory near full
      - alert: GPUMemoryCritical
        expr: (DCGM_FI_DEV_FB_USED / (DCGM_FI_DEV_FB_USED + DCGM_FI_DEV_FB_FREE)) > 0.95
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "GPU memory above 95% — OOM risk"

      # Requests queueing
      - alert: InferenceQueueBacklog
        expr: vllm_num_requests_waiting > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "More than 10 requests waiting — need more inference replicas"

      # High latency
      - alert: InferenceLatencyHigh
        expr: histogram_quantile(0.99, rate(vllm_request_duration_seconds_bucket[5m])) > 30
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "P99 inference latency above 30 seconds"

      # No traffic (possible issue)
      - alert: NoInferenceTraffic
        expr: rate(vllm_request_success_total[15m]) == 0
        for: 15m
        labels:
          severity: info
        annotations:
          summary: "No inference traffic for 15 minutes — check if expected"

      # Pod restarts
      - alert: InferencePodRestarting
        expr: rate(kube_pod_container_status_restarts_total{container="vllm"}[15m]) > 0
        labels:
          severity: critical
        annotations:
          summary: "vLLM pod is restarting — check logs for OOM or crash"
\`\`\`

### The Client Dashboard Layout

Build this exact Grafana dashboard for every client:

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│ Row 1: OVERVIEW                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │ Requests │ │ P95      │ │ Error    │ │ Active   │        │
│ │ /sec     │ │ Latency  │ │ Rate     │ │ Pods     │        │
│ │ (stat)   │ │ (stat)   │ │ (stat)   │ │ (stat)   │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├──────────────────────────────────────────────────────────────┤
│ Row 2: GPU HEALTH                                            │
│ ┌─────────────────────┐ ┌─────────────────────┐             │
│ │ GPU Utilisation (%)  │ │ GPU Memory (%)      │             │
│ │ (time series)        │ │ (time series)        │             │
│ └─────────────────────┘ └─────────────────────┘             │
│ ┌─────────────────────┐ ┌─────────────────────┐             │
│ │ GPU Temperature      │ │ GPU Power            │             │
│ │ (gauge)              │ │ (time series)        │             │
│ └─────────────────────┘ └─────────────────────┘             │
├──────────────────────────────────────────────────────────────┤
│ Row 3: INFERENCE PERFORMANCE                                 │
│ ┌─────────────────────┐ ┌─────────────────────┐             │
│ │ Latency P50/P95/P99 │ │ Throughput (req/s)  │             │
│ │ (time series)        │ │ (time series)        │             │
│ └─────────────────────┘ └─────────────────────┘             │
│ ┌─────────────────────┐ ┌─────────────────────┐             │
│ │ Queue Depth          │ │ Tokens/sec           │             │
│ │ (time series)        │ │ (time series)        │             │
│ └─────────────────────┘ └─────────────────────┘             │
├──────────────────────────────────────────────────────────────┤
│ Row 4: COST                                                  │
│ ┌─────────────────────┐ ┌─────────────────────┐             │
│ │ € per Hour           │ │ € per 1K Tokens     │             │
│ │ (stat)               │ │ (stat)               │             │
│ └─────────────────────┘ └─────────────────────┘             │
│ ┌───────────────────────────────────────────────┐           │
│ │ Daily Cost Trend (30 days)                     │           │
│ │ (time series)                                  │           │
│ └───────────────────────────────────────────────┘           │
└──────────────────────────────────────────────────────────────┘
\`\`\`

**Export this dashboard as JSON** — you'll import it for every client.

---

## Homework

1. **Build the dashboard** in Grafana (even with mock data if you don't have a live cluster)
2. **Export it as JSON** and save it in your template repo
3. **Set up alert rules** and trigger them intentionally (load test to get GPU > 90%)
4. **Write a "Monitoring Handoff" doc** — 1 page explaining each panel to a client's engineer

---

Next: [Module 2.3: Autoscaling & Cost Optimisation](module-2.3-autoscaling.md)`;

const content_2_3 = `## Where You Save Clients the Most Money

This module is your biggest value-add. Most companies run GPUs 24/7. You'll teach them (and yourself) how to pay only for what they use.

---

### The Three Levels of Autoscaling

\`\`\`
Level 1: Pod Autoscaling     → Add/remove inference replicas
Level 2: Node Autoscaling    → Add/remove GPU nodes
Level 3: Schedule-Based      → Scale by time of day
\`\`\`

### Level 1: Pod Autoscaling with KEDA

KEDA (Kubernetes Event-Driven Autoscaling) is your best tool because it:
- Supports scale-to-zero (HPA can't)
- Can trigger on Prometheus metrics (GPU utilisation, queue depth)
- Has stabilisation windows to prevent flapping

\`\`\`bash
# Install KEDA
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm install keda kedacore/keda --namespace keda --create-namespace
\`\`\`

**Scale on GPU utilisation:**
\`\`\`yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: vllm-gpu-scaler
  namespace: ai-serving
spec:
  scaleTargetRef:
    name: ai-serving-vllm
  minReplicaCount: 1       # Keep 1 always running
  maxReplicaCount: 5
  cooldownPeriod: 300       # Wait 5 min before scaling down
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://ai-monitoring-prometheus.monitoring:9090
        metricName: gpu_util_avg
        query: avg(DCGM_FI_DEV_GPU_UTIL{pod=~"ai-serving.*"})
        threshold: "70"      # Scale up when avg GPU > 70%
        activationThreshold: "10"  # Only activate when > 10%
\`\`\`

**Scale on queue depth (better for bursty traffic):**
\`\`\`yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: vllm-queue-scaler
  namespace: ai-serving
spec:
  scaleTargetRef:
    name: ai-serving-vllm
  minReplicaCount: 1
  maxReplicaCount: 5
  cooldownPeriod: 300
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://ai-monitoring-prometheus.monitoring:9090
        metricName: vllm_waiting_requests
        query: sum(vllm_num_requests_waiting{namespace="ai-serving"})
        threshold: "5"       # Scale up when >5 requests waiting
\`\`\`

**Scale-to-zero for dev/staging:**
\`\`\`yaml
spec:
  minReplicaCount: 0           # Scale to zero!
  cooldownPeriod: 600           # Wait 10 min of no traffic
  advanced:
    restoreToOriginalReplicaCount: false
    horizontalPodAutoscalerConfig:
      behavior:
        scaleDown:
          stabilizationWindowSeconds: 600
          policies:
            - type: Pods
              value: 1
              periodSeconds: 60
\`\`\`

### Level 2: Cluster Autoscaler (Node Scaling)

The K8s Cluster Autoscaler adds/removes nodes based on pending pods:

\`\`\`
Pod needs GPU → No GPU node available → Autoscaler adds GPU node (2-5 min)
No GPU pods running → GPU node idle for 10 min → Autoscaler removes node
\`\`\`

**GKE:** Built-in, configured via our Terraform (min_nodes=0, max_nodes=3)
**EKS:** Install cluster-autoscaler or Karpenter

**Cost impact:**
\`\`\`
Without autoscaling:  1x A100 running 24/7    = €2,160/month (on-demand)
With autoscaling:     1x A100 running 10hr/day = €900/month
With spot + scaling:  1x A100 spot, 10hr/day   = €360/month

Savings: 83%
\`\`\`

### Level 3: Schedule-Based Scaling

For predictable workloads (e.g., business hours only):

\`\`\`yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: vllm-schedule-scaler
  namespace: ai-serving
spec:
  scaleTargetRef:
    name: ai-serving-vllm
  minReplicaCount: 0
  maxReplicaCount: 3
  triggers:
    # Business hours (Mon-Fri, 8am-6pm Ireland time)
    - type: cron
      metadata:
        timezone: Europe/Dublin
        start: "0 8 * * 1-5"
        end: "0 18 * * 1-5"
        desiredReplicas: "2"
    # Off-hours: scale to zero (handled by minReplicaCount: 0)
\`\`\`

---

### The Cost Optimisation Playbook

When you audit a client, run through this checklist:

\`\`\`
┌──────────────────────────────────────────────────────────────────┐
│ COST AUDIT CHECKLIST                                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 1. GPU RIGHT-SIZING                                              │
│    □ What model are they running?                                 │
│    □ How much VRAM does it actually need?                        │
│    □ Are they using A100 when L4 would work?                     │
│    □ Can they quantise to use a smaller GPU?                     │
│                                                                   │
│ 2. SPOT INSTANCES                                                 │
│    □ Are they using on-demand for inference?                      │
│    □ Do they have multi-replica setup for spot safety?            │
│    □ What's the spot discount in their region?                    │
│                                                                   │
│ 3. AUTOSCALING                                                    │
│    □ Are GPUs running 24/7?                                       │
│    □ What's the actual traffic pattern? (bursty? business hours?) │
│    □ Can they scale to zero during off-hours?                     │
│    □ Is cluster autoscaler configured for GPU node pool?          │
│                                                                   │
│ 4. BATCHING & THROUGHPUT                                          │
│    □ Are they using continuous batching (vLLM)?                   │
│    □ What's their GPU utilisation? (< 50% = wasting money)       │
│    □ Can they increase max_batch_size?                            │
│                                                                   │
│ 5. RESERVED / COMMITTED USE                                      │
│    □ For stable baseline load, have they committed?              │
│    □ 1-year commit = 30-40% discount                             │
│    □ 3-year commit = 50-60% discount                             │
│                                                                   │
│ 6. MULTI-MODEL EFFICIENCY                                        │
│    □ Multiple small models → can they share a GPU (Triton/MIG)?  │
│    □ Embedding model + LLM → can embedding run on CPU?           │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
\`\`\`

### Cost Report Template (Deliver to Every Client)

\`\`\`markdown
# GPU Cost Optimisation Report — [Client Name]
Date: [date]

## Current State
- GPU type: [e.g., 2x A100 80GB on-demand]
- Monthly cost: €[X]
- Average GPU utilisation: [X]%
- Running hours: 24/7

## Recommendations

### Quick Wins (implement this week)
1. **Enable spot instances** — save €[X]/month
   Risk: low (multi-replica handles preemption)

2. **Add autoscaling** — save €[X]/month
   Traffic is only 8am-6pm, no need for 24/7

### Medium-Term (implement this month)
3. **Quantise to AWQ 4-bit** — save €[X]/month
   Quality impact: minimal for chat/support use case
   Allows downgrade from A100 to L4

### Long-Term (next quarter)
4. **Committed use discount** — save €[X]/month
   1-year commitment on baseline capacity

## Summary
| | Current | Optimised | Savings |
|---|---------|-----------|---------|
| Monthly cost | €[X] | €[X] | €[X] (XX%) |
| Annual cost | €[X] | €[X] | €[X] |
\`\`\`

---

## Homework

1. **Deploy KEDA** on your lab cluster and configure GPU-based autoscaling
2. **Simulate a traffic pattern** — send bursts of requests and watch pods scale up, then stop and watch them scale down
3. **Calculate cost savings** for a hypothetical client running 2x A100 24/7 with 40% average utilisation
4. **Create your cost report template** — fill in real numbers from your lab

---

Next: [Module 2.4: API Gateway & Security](module-2.4-gateway-security.md)`;

const content_2_4 = `## Protecting the Inference Endpoint

No client should expose their model serving directly to the internet. This module covers the gateway layer that sits in front of vLLM.

---

### Why an API Gateway?

\`\`\`
Without gateway:
  Internet → vLLM (no auth, no rate limiting, no logging)
  ❌ Anyone can use your GPU
  ❌ No usage tracking
  ❌ DDoS will kill your inference

With gateway:
  Internet → Kong → vLLM
  ✅ API key authentication
  ✅ Rate limiting per client
  ✅ Request/response logging (metadata only)
  ✅ TLS termination
  ✅ Usage analytics
\`\`\`

### Kong Setup on K8s

Our Helm chart deploys Kong in DB-less mode (configuration via K8s CRDs):

\`\`\`bash
# Deploy (already in our template)
helm upgrade --install ai-gateway ./gateway \\
  --namespace gateway --create-namespace
\`\`\`

### Configure Authentication

\`\`\`yaml
# API Key authentication plugin
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: ai-key-auth
  namespace: gateway
plugin: key-auth
config:
  key_names:
    - x-api-key
    - apikey
  hide_credentials: true    # Don't forward key to vLLM
---
# Rate limiting plugin
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: ai-rate-limit
  namespace: gateway
plugin: rate-limiting
config:
  minute: 60                # 60 requests per minute
  hour: 1000                # 1000 per hour
  policy: local
  fault_tolerant: true
---
# Request size limiting (prevent massive prompts)
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: ai-request-size
  namespace: gateway
plugin: request-size-limiting
config:
  allowed_payload_size: 1    # 1 MB max request body
---
# Route to vLLM
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ai-inference
  namespace: ai-serving
  annotations:
    konghq.com/plugins: ai-key-auth,ai-rate-limit,ai-request-size
    konghq.com/strip-path: "false"
spec:
  ingressClassName: kong
  rules:
    - host: ai-api.example.com      # Replace with client's domain
      http:
        paths:
          - path: /v1
            pathType: Prefix
            backend:
              service:
                name: ai-serving-vllm
                port:
                  number: 8000
---
# Create an API consumer (client)
apiVersion: configuration.konghq.com/v1
kind: KongConsumer
metadata:
  name: client-app
  namespace: gateway
  annotations:
    kubernetes.io/ingress.class: kong
username: client-app
credentials:
  - client-app-key
---
# API key for the consumer
apiVersion: v1
kind: Secret
metadata:
  name: client-app-key
  namespace: gateway
  labels:
    konghq.com/credential: key-auth
type: Opaque
stringData:
  key: "sk-client-app-key-change-me"    # Generate a real key
  kongCredType: key-auth
\`\`\`

### Testing with Authentication

\`\`\`bash
# Without key — should get 401
curl https://ai-api.example.com/v1/models
# {"message":"No API key found in request"}

# With key — should work
curl https://ai-api.example.com/v1/models \\
  -H "x-api-key: sk-client-app-key-change-me"

# Rate limit exceeded — should get 429
for i in \$(seq 1 65); do
  curl -s -o /dev/null -w "%{http_code}\\n" \\
    https://ai-api.example.com/v1/models \\
    -H "x-api-key: sk-client-app-key-change-me"
done
# Last few should show 429
\`\`\`

### TLS / HTTPS Setup

\`\`\`bash
# Install cert-manager for automatic TLS certificates
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager \\
  --namespace cert-manager --create-namespace \\
  --set installCRDs=true

# Create a ClusterIssuer for Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: kong
EOF
\`\`\`

Then add TLS to the Ingress:
\`\`\`yaml
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - ai-api.example.com
      secretName: ai-api-tls
\`\`\`

### Logging Best Practices

**Log metadata, NOT payloads:**
\`\`\`yaml
# Kong logging plugin — log to stdout (collected by K8s logging)
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: ai-access-log
  namespace: gateway
plugin: file-log
config:
  path: /dev/stdout
  custom_fields_by_lua:
    # Log these fields
    request_id: "return kong.request.get_header('x-request-id') or 'none'"
    consumer: "return kong.client.get_consumer() and kong.client.get_consumer().username or 'anonymous'"
    # DO NOT log request/response bodies
\`\`\`

**What to log:**
- Timestamp, request ID, consumer name
- HTTP method, path, status code
- Latency (gateway + upstream)
- Token count (if available from response headers)
- Rate limit remaining

**What NOT to log:**
- Request body (contains user prompts — possibly PII)
- Response body (contains model outputs — possibly sensitive)
- API keys

---

## Homework

1. **Deploy Kong** with auth and rate limiting on your lab cluster
2. **Create 2 different API consumers** with different rate limits
3. **Test rate limiting** — verify 429 responses work correctly
4. **Set up TLS** with cert-manager (use a staging Let's Encrypt issuer for testing)

---

Next: [Module 2.5: Troubleshooting Playbook](module-2.5-troubleshooting.md)`;

const content_2_5 = `## The 15 Problems You'll See at Every Client

This is your field manual. Print it, bookmark it, memorise it. When a client calls with an issue, you need to diagnose it in minutes, not hours.

---

### Problem 1: Pod stuck in Pending (GPU not available)
**Symptoms:** Pod stays in \`Pending\`, events show \`Insufficient nvidia.com/gpu\`
**Diagnosis:**
\`\`\`bash
kubectl describe pod <pod-name> -n ai-serving | grep -A5 Events
kubectl get nodes -l role=gpu-inference
kubectl describe node <node> | grep -A5 "Allocated resources"
\`\`\`
**Fix:**
- Check if GPU node pool has reached max nodes
- Check if another pod is hogging the GPU
- Check ResourceQuota limits
- Increase max nodes in autoscaler

### Problem 2: Pod in CrashLoopBackOff (startup probe failure)
**Symptoms:** Pod restarts repeatedly, events show "startup probe failed"
**Diagnosis:**
\`\`\`bash
kubectl logs <pod-name> -n ai-serving --previous
kubectl get events -n ai-serving --sort-by='.lastTimestamp' | tail -20
\`\`\`
**Fix:** Increase \`startupProbe.failureThreshold\` (large models need 5+ minutes)

### Problem 3: OOMKilled
**Symptoms:** Pod killed, status shows \`OOMKilled\`
**Diagnosis:**
\`\`\`bash
kubectl describe pod <pod-name> | grep -A3 "Last State"
# Check if it's system OOM or GPU OOM
kubectl logs <pod-name> --previous | grep -i "out of memory"
\`\`\`
**Fix:**
- System OOM: Increase \`resources.limits.memory\`
- GPU OOM: Reduce \`--gpu-memory-utilization\` or \`--max-model-len\` in vLLM args

### Problem 4: High latency / slow responses
**Symptoms:** P95 latency > 10s, users complaining
**Diagnosis:**
\`\`\`bash
# Check GPU utilisation
kubectl exec <pod> -- nvidia-smi
# Check queue depth
curl localhost:8000/metrics | grep vllm_num_requests
# Check CPU throttling
kubectl top pod <pod-name>
\`\`\`
**Fix:**
- High GPU util + queue: Add more replicas (scale up)
- Low GPU util + slow: Check CPU — tokenisation may be bottlenecked
- High memory pressure: Reduce \`--max-model-len\` or quantise

### Problem 5: Model download fails
**Symptoms:** Init container or vLLM fails to download model from HuggingFace
**Diagnosis:**
\`\`\`bash
kubectl logs <pod-name> -c model-downloader  # if using init container
kubectl logs <pod-name> | grep -i "error\\|forbidden\\|401"
\`\`\`
**Fix:**
- Check HF token is valid and has access to gated models
- Check network egress is allowed (network policies)
- Use a PVC with pre-downloaded model instead

### Problem 6: Spot instance reclaimed
**Symptoms:** Node disappears, pods reschedule (or don't)
**Diagnosis:**
\`\`\`bash
kubectl get events --all-namespaces | grep "preempt\\|reclaim"
kubectl get pods -n ai-serving  # Check if pods are Pending
\`\`\`
**Fix:**
- Ensure multiple replicas across zones
- Set PodDisruptionBudget: \`minAvailable: 1\`
- Mix on-demand (baseline) + spot (burst)

### Problem 7: GPU driver version mismatch
**Symptoms:** Pod crashes with CUDA errors
**Diagnosis:**
\`\`\`bash
kubectl exec <pod> -- nvidia-smi  # Check driver version
# Compare with the CUDA version the container expects
kubectl logs <pod> | grep -i "cuda\\|driver"
\`\`\`
**Fix:**
- Update GPU drivers on nodes (managed by cloud provider usually)
- Use a vLLM image that matches the installed CUDA version
- On GKE: set \`gpu_driver_version = "LATEST"\` in Terraform

### Problem 8: Autoscaler not scaling up
**Symptoms:** Queue depth is high but no new pods appear
**Diagnosis:**
\`\`\`bash
kubectl get hpa -n ai-serving  # Check HPA status
kubectl get scaledobjects -n ai-serving  # If using KEDA
kubectl describe scaledobject <name>  # Check events
# Verify Prometheus metrics are being scraped
curl <prometheus-url>/api/v1/query?query=DCGM_FI_DEV_GPU_UTIL
\`\`\`
**Fix:**
- KEDA: Check Prometheus query returns data
- HPA: Check custom metrics API is configured
- Cluster autoscaler: Check if node pool has room to grow

### Problem 9: Autoscaler too aggressive (flapping)
**Symptoms:** Pods scaling up and down rapidly
**Fix:**
\`\`\`yaml
# Increase stabilisation windows
behavior:
  scaleUp:
    stabilizationWindowSeconds: 120   # Wait 2 min before scaling up
  scaleDown:
    stabilizationWindowSeconds: 300   # Wait 5 min before scaling down
    policies:
      - type: Pods
        value: 1              # Only remove 1 pod at a time
        periodSeconds: 120    # Every 2 minutes
\`\`\`

### Problem 10: Model returns garbage / wrong outputs
**Symptoms:** Model responds but output is incoherent
**Diagnosis:**
- Check quantisation: Did quality degrade too much?
- Check \`--max-model-len\`: If too short, context gets truncated
- Check model version: Is the right model loaded?
\`\`\`bash
curl localhost:8000/v1/models  # Verify correct model
\`\`\`
**Fix:**
- Try FP16 instead of quantised
- Increase \`--max-model-len\`
- Verify model checkpoint integrity

### Problem 11: Monitoring gaps (no GPU metrics)
**Symptoms:** Grafana dashboards show "No data"
**Diagnosis:**
\`\`\`bash
kubectl get pods -n monitoring | grep dcgm
kubectl logs <dcgm-pod> -n monitoring
# Check if Prometheus is scraping DCGM
curl <prometheus-url>/api/v1/targets | grep dcgm
\`\`\`
**Fix:**
- DCGM exporter not running → install it
- Prometheus not scraping → add scrape config or ServiceMonitor
- Wrong metric names → check DCGM version (metric names changed between versions)

### Problem 12: Cost overrun
**Symptoms:** Cloud bill higher than expected
**Diagnosis:**
\`\`\`bash
# Check if nodes are idle
kubectl top nodes
# Check if autoscaler is scaling down
kubectl get nodes -l role=gpu-inference
# Check spot vs on-demand
kubectl get nodes -o json | jq '.items[].metadata.labels["cloud.google.com/gke-spot"]'
\`\`\`
**Fix:**
- Autoscaler min too high → reduce minimum nodes
- Spot not enabled → enable spot instances
- Dev environment running 24/7 → add schedule-based scaling

### Problem 13: Network policy blocking traffic
**Symptoms:** Gateway can't reach vLLM, 502/503 errors
**Diagnosis:**
\`\`\`bash
kubectl get networkpolicy -n ai-serving
kubectl describe networkpolicy <policy> -n ai-serving
# Test connectivity from gateway pod
kubectl exec <gateway-pod> -n gateway -- curl http://ai-serving-vllm.ai-serving:8000/health
\`\`\`
**Fix:** Ensure network policy allows ingress from gateway namespace

### Problem 14: TLS certificate issues
**Symptoms:** HTTPS not working, certificate errors
**Diagnosis:**
\`\`\`bash
kubectl get certificates -A
kubectl describe certificate <cert-name>
kubectl get certificaterequest -A
kubectl logs -n cert-manager deployment/cert-manager
\`\`\`
**Fix:**
- DNS not pointing to load balancer → update DNS
- cert-manager issuer misconfigured → check ClusterIssuer
- Rate limited by Let's Encrypt → wait and retry

### Problem 15: Cold start too slow
**Symptoms:** First request after scale-from-zero takes 5+ minutes
**Diagnosis:** This is expected — model needs to download + load into GPU memory
**Mitigation:**
- Pre-download model to PVC (avoids download time)
- Use a smaller/quantised model (faster to load)
- Keep minReplicas=1 in production (no cold start)
- Set minReplicas=0 only in dev/staging

---

## The Troubleshooting Framework

When something breaks, follow this order:

\`\`\`
1. CHECK EVENTS     → kubectl get events --sort-by='.lastTimestamp'
2. CHECK LOGS       → kubectl logs <pod> (and --previous for crashed pods)
3. CHECK RESOURCES  → kubectl top pods / kubectl describe node
4. CHECK NETWORK    → Test connectivity between services
5. CHECK METRICS    → Prometheus/Grafana for trends
\`\`\`

**90% of issues are solved at step 1 or 2.**

---

## Homework

1. **Deliberately cause 5 of these failures** on your lab cluster and practice diagnosing + fixing them
2. **Time yourself** — can you diagnose each issue in under 5 minutes?
3. **Create a personal runbook** with your notes on each issue

---

Next: [Week 3: The Business](../week-3-business/module-3.1-positioning.md)`;

const content_3_1 = `## How to Describe What You Do (So People Want to Buy It)

Most technical people describe their services in terms of **what they do**. Clients buy based on **what they get**. This module rewires your pitch.

---

### The Positioning Statement

Fill in this template:

> I help **[who]** achieve **[outcome]** by **[how]**, so they can **[ultimate benefit]**.

**Your version:**

> I help **companies running AI** achieve **production-ready self-hosted infrastructure** by **deploying optimised Kubernetes GPU stacks**, so they can **ship AI features faster while keeping costs down and data in-house**.

### The 30-Second Pitch (Elevator Pitch)

Practice saying this until it's natural:

> "Most companies building AI hit the same wall — their models work in notebooks but can't get to production. Their ML team ends up spending months debugging Kubernetes GPU scheduling instead of building features.
>
> I fix that. I deploy production-ready AI infrastructure on Kubernetes in 2-3 weeks. The model goes live, GPU costs drop 40-60%, and your data never leaves your cloud.
>
> I've been architecting cloud and data infrastructure for over 10 years — this is the specific problem I solve now."

### The One-Liner (For LinkedIn Headlines, Bios, etc.)

Options — pick one:

- "I help companies self-host AI without the 3-month infrastructure headache"
- "Production-ready K8s for AI workloads. Deployed in weeks, not months."
- "AI Infrastructure Architect — I get your models off laptops and into production"

### Words That Work vs Words That Don't

| Don't Say | Say Instead | Why |
|-----------|-------------|-----|
| "I do DevOps" | "I deploy AI infrastructure" | DevOps is generic and undervalued |
| "I set up Kubernetes" | "I get your AI models to production" | Outcome, not activity |
| "I'm a freelancer" | "I'm an independent consultant" | Perceived value difference |
| "I can try" | "Here's my recommendation" | Confidence |
| "It depends" | "For your situation, I'd suggest..." | Specificity |
| "I'm pretty good at K8s" | "I've been building cloud infrastructure for 10+ years" | Authority |

### Your LinkedIn Profile Rewrite

\`\`\`
HEADLINE:
AI Infrastructure Consultant | I help companies self-host AI on Kubernetes

ABOUT:
Companies building AI products hit a wall: models work in notebooks,
but getting them to production takes months of infrastructure work.

I solve that.

I deploy production-ready Kubernetes infrastructure for AI workloads —
model serving, GPU optimisation, monitoring, security — in 2-3 weeks.

What clients get:
→ Models in production (not stuck in notebooks)
→ 40-60% lower GPU costs
→ Full data sovereignty (GDPR-compliant)
→ Their ML team doing ML, not infrastructure

Background: 10+ years in cloud architecture, Kubernetes, and data
engineering. Based in Ireland.

Currently booking engagements for Q2 2026.
DM me or visit [your-site.vercel.app]
\`\`\`

### Content Pillars (What to Post About)

Post about these 4 topics on rotation:

\`\`\`
1. EDUCATION        "Here's how GPU scheduling works in K8s..."
   → Builds authority

2. PAIN POINTS      "5 mistakes companies make self-hosting LLMs..."
   → Creates demand

3. BEHIND THE SCENES "Just deployed a 70B model for a client. Here's what I learned..."
   → Builds trust

4. RESULTS          "Helped a startup cut GPU costs from €15K to €3.5K/month..."
   → Creates urgency
\`\`\`

Post 3-4x per week. Each post should end with a soft CTA: "DM me if..." or "Link in comments."

---

## Homework

1. **Write your 30-second pitch** and say it out loud 10 times
2. **Rewrite your LinkedIn profile** using the template above
3. **Draft 3 LinkedIn posts** (one from each pillar)
4. **Practice explaining what you do** to a non-technical friend — if they understand, you're ready

---

Next: [Module 3.2: Pricing Psychology](module-3.2-pricing.md)`;

const content_3_2 = `## Why €7,000 Feels Like a Bargain (When You Frame It Right)

---

### The Value Equation

\`\`\`
Client's perceived value = (Result they get) - (Price they pay)
\`\`\`

Your job: make the result feel MUCH bigger than the price.

### Anchoring — The Most Powerful Pricing Technique

**Anchor against the alternative, not your cost.**

| Your fee | The alternative | The anchor |
|----------|----------------|------------|
| €7-11K one-time | Hire ML Platform Engineer: €120-180K/year | "For 5% of the annual cost of a hire, you get the same result in 3 weeks" |
| €7-11K one-time | 3 months of engineer time: €30-45K | "I deliver in 3 weeks what takes most teams 3 months" |
| €7-11K one-time | €15K/month in wasted GPU costs | "The engagement pays for itself in month 1" |

**On discovery calls, always establish the anchor first:**

> "What are you spending on GPU infrastructure right now?"
> [They say €12K/month]
> "And how long have you been trying to optimise that?"
> [They say 3 months]
> "So you've spent about €36K on this problem already. My engagement is €9K and typically reduces GPU costs by 40-60%. That's €5-7K/month in savings — so it pays for itself in less than 2 months."

### The Three-Tier Strategy

**Always offer three options.** Psychologically, people gravitate toward the middle:

\`\`\`
Tier 1: Architecture Review    €3,000 - €4,500    (the "too small" option)
Tier 2: Build & Deploy         €7,000 - €11,000   (the "just right" option) ← most will pick this
Tier 3: Managed Retainer       €2,000 - €3,500/mo (the "ongoing" option)
\`\`\`

**Why three tiers work:**
- Tier 1 exists to make Tier 2 look like better value
- Tier 2 is where you want clients (highest one-time revenue)
- Tier 3 is where recurring revenue comes from
- Nobody feels forced — they choose

### Price Ranges (Not Fixed Prices)

Always quote a range: "€7,000 to €11,000" — not "€9,000."

**Why ranges work:**
- The client self-selects based on budget
- You can adjust scope within the range
- The lower end makes it accessible
- The higher end anchors expected value
- You always look flexible and reasonable

### When to Discount (And When Not To)

**Acceptable discounts:**
- First client: 20-30% off for a case study + testimonial (this is an investment, not a discount)
- Referral bonus: 10% off if they refer another client
- Bundle: Tier 2 + Tier 3 together for 10% off

**Never discount because:**
- They ask for a lower price (hold firm, reduce scope instead)
- You feel imposter syndrome (your feeling ≠ your value)
- They compare you to a freelancer on Upwork (different service entirely)

**Instead of discounting, reduce scope:**
> "I understand the budget constraint. For €5K, I can deliver the architecture review plus a partial deployment — the K8s cluster and model serving, without the monitoring stack and API gateway. You could add those later."

### Pricing Objection Scripts

**"That's more than we expected"**
> "I understand. Let me put it in context: an ML Platform Engineer costs €120-180K/year. This engagement delivers the same result in 3 weeks for less than one month of that salary. And you own everything I build."

**"Can you do it for €X?" (lowball)**
> "I can adjust the scope to fit €X. For that budget, I'd recommend [reduced scope]. What's most important to you?"

**"We'll think about it"**
> "Of course. One thing to consider — you mentioned you're spending €12K/month on GPU costs right now. Every month of delay is another month at that rate. Happy to hold a spot in my calendar for 2 weeks."

**"We can get someone on Upwork for €2K"**
> "You could. The question is whether you'll get production-grade infrastructure or something you'll need to redo in 6 months. My clients come to me after that experience."

### Invoice Structure

**For project work (Tier 1 & 2):**
- 50% upfront before work begins
- 50% on completion/handoff
- Net 14 payment terms

**For retainers (Tier 3):**
- Monthly invoice, due on receipt
- First month paid upfront

### Irish Tax Considerations

- **Sole trader:** Simple, report income on Form 11, pay income tax + PRSI + USC
- **Limited company:** Better for tax efficiency above ~€75K revenue. Corporation tax 12.5%.
- **VAT:** Register when turnover exceeds €37,500 (services). B2B clients in Ireland = charge VAT. B2B clients in other EU countries = reverse charge (no VAT). Non-EU = no VAT.
- **Talk to an accountant** before your first invoice. Cost: €200-400 for a consultation. Worth every cent.

---

## Homework

1. **Practice the anchoring conversation** out loud — the GPU cost savings pitch
2. **Decide your exact price range** for each tier (use the ranges above as starting points)
3. **Write your invoice template** (include business name, IBAN, VAT number if applicable)
4. **Book a 30-min consultation with an Irish accountant** — sole trader vs Ltd, VAT registration

---

Next: [Module 3.3: The Discovery Call](module-3.3-discovery-call.md)`;

const content_3_3 = `## The 15-Minute Call That Closes Deals

The discovery call is where deals are won or lost. This module gives you a repeatable script.

---

### The Golden Rules

1. **Listen more than you talk** (aim for 70/30 — them talking 70% of the time)
2. **Ask, don't tell** — questions make you look smart, monologues make you look desperate
3. **Take notes** — write down exact phrases they use. Mirror their language later.
4. **Never pitch on the first call** — your job is to understand, not to sell

### The Script (15 minutes)

#### Opening (1-2 minutes)
> "Thanks for taking the time, [name]. I'll keep this quick — I know you're busy. I'd love to understand what you're building and where you're stuck, and I'll tell you honestly if I can help. Sound good?"

*Why this works: You're respectful of their time, you lead with curiosity, and "I'll tell you honestly if I can help" builds trust.*

#### Discovery Questions (8-10 minutes)

Ask these in this order. Each question builds on the previous one.

**1. The Situation**
> "Tell me about what you're building — what AI/ML workloads are you running or planning to run?"

*Listen for: model names, use cases, scale*

**2. The Current State**
> "Where are you hosting this today? Any constraints like compliance, data residency, or specific cloud requirements?"

*Listen for: cloud provider, compliance needs, vendor lock-in concerns*

**3. The Team**
> "What does your engineering team look like? Do you have platform or infra engineers, or is it mostly data scientists and ML engineers?"

*Listen for: skill gaps, who's been struggling with this*

**4. The Problem**
> "What have you tried so far? What's been the biggest blocker?"

*Listen for: wasted time, failed attempts, frustration — this is their pain*

**5. The Impact**
> "What happens if this doesn't get solved in the next month? What's the cost of waiting?"

*Listen for: delayed product launch, ongoing GPU costs, blocked team*

**6. The Budget**
> "Do you have a budget in mind for solving this, or would it be helpful if I put together options at different price points?"

*Listen for: budget range, decision-making process*

**7. The Timeline**
> "If we were to work together, what's your ideal timeline? Is there a deadline driving this?"

*Listen for: urgency, external pressures*

#### The Bridge (2-3 minutes)

Now connect their problems to your solution:

> "Based on what you've described, here's what I'd recommend..."

Map their specific situation to your tier:
- Small/exploratory → Tier 1 (Architecture Review)
- Urgent/clear need → Tier 2 (Build & Deploy)
- Already built but struggling → Tier 2 (fix) + Tier 3 (retainer)

Be specific:
> "For your use case — running [their model] on [their cloud] with [their compliance need] — I'd deploy vLLM on a dedicated GPU node pool with autoscaling. Based on your traffic, you'd need [X] and it would cost roughly [Y] in cloud spend. My engagement fee for this would be in the [range]."

#### The Close (1-2 minutes)

> "I can put together a one-page proposal by [day]. It'll outline exactly what I'd do, the timeline, and the investment. If it looks right, we can kick off as early as [date]. Does that work?"

**If they say yes:** "Great, I'll send it over by [day]. In the meantime, if you could share [access to their cloud dashboard / architecture docs / current K8s config], that'll help me make the proposal more specific."

**If they hesitate:** "No pressure at all. The proposal is free and there's no obligation. It'll give you something concrete to evaluate."

**If they say no/not now:** "Totally understand. Mind if I ask what's holding you back?" (Then listen — you might learn something that changes your approach.)

---

### Post-Call Checklist

Within 1 hour of the call:

- [ ] Send a thank-you message (LinkedIn DM or email)
- [ ] Update your lead tracker (status, notes, next action)
- [ ] Draft the proposal (while the conversation is fresh)
- [ ] Note any objections or concerns to address in the proposal

### The Follow-Up Sequence

\`\`\`
Day 0:  Discovery call
Day 1:  Send proposal + thank-you note
Day 3:  "Just checking if you had a chance to review the proposal"
Day 7:  "I have a few spots opening up in [month]. Want to book one?"
Day 14: "Last follow-up — happy to answer any questions. No pressure."
Day 30: Add to nurture list (occasional LinkedIn engagement)
\`\`\`

**Three follow-ups maximum.** After that, engage with their content on LinkedIn but don't push.

---

### Mock Discovery Call Exercise

**Practice this with a friend, partner, or even by yourself on video.**

Scenario: You're talking to the CTO of a Series B startup (50 employees, 8 engineers). They're building a customer support chatbot using Llama 3 70B. They've been trying to deploy it on AWS EKS for 2 months. Their data scientist set up a Flask API wrapper, but it crashes under load. They're spending €8K/month on a p4d.24xlarge instance that runs 24/7. They need it live before a board meeting in 6 weeks.

**Record yourself doing this call. Watch it back. Cringe. Improve. Repeat.**

---

## Homework

1. **Practice the script** — do 3 mock calls this week (with a friend, or talk to yourself on camera)
2. **Write down your 5 best discovery questions** on a sticky note — keep it visible during real calls
3. **Create a call notes template** in your lead tracker
4. **Record one mock call** and review it — note where you talked too much or missed a follow-up question

---

Next: [Module 3.4: Proposals & Contracts](module-3.4-proposals-contracts.md)`;

const content_3_4 = `## Templates You Can Use Today

---

### The One-Page Proposal Template

Keep proposals short. One page. Busy executives don't read 10-page proposals.

\`\`\`markdown
# Proposal: AI Infrastructure for [Company Name]

**Prepared by:** [Your Name]
**Date:** [date]
**Valid until:** [date + 14 days]

---

## The Challenge

[2-3 sentences describing THEIR problem, using THEIR words from the discovery call]

Example: "Your ML team has built a Llama 3 70B chatbot that performs well
in testing, but deploying it to production on EKS has been blocked for
2 months. Meanwhile, a p4d.24xlarge instance is running 24/7 at €8K/month
with low utilisation."

## Proposed Solution

I will deploy a production-ready AI inference stack on your existing AWS
infrastructure:

- **Model serving:** vLLM with continuous batching (3-5x throughput improvement)
- **Infrastructure:** EKS with dedicated GPU node pool, spot instances, autoscaling
- **Monitoring:** Prometheus + Grafana dashboards for GPU health, latency, and costs
- **Security:** API gateway with authentication, rate limiting, network isolation
- **Documentation:** Architecture docs, runbooks, and a 60-min handoff session

## Timeline

| Week | Deliverables |
|------|-------------|
| Week 1 | Architecture review, infrastructure provisioning |
| Week 2 | Model serving deployment, monitoring stack |
| Week 3 | API gateway, security hardening, load testing, handoff |

## Investment

**€9,000** (one-time, fixed scope)
- 50% due on project start (€4,500)
- 50% due on handoff (€4,500)

**Estimated ongoing cloud costs:** €2,500-3,500/month (down from €8,000)

## Expected Outcomes

- Model in production within 3 weeks
- GPU costs reduced by ~55-65% (€4,500-5,500/month savings)
- Engagement pays for itself within 2 months
- Your ML team freed up to focus on model improvement

## Next Steps

1. Reply to confirm, and I'll send the contract
2. I'll request access to your AWS account / K8s cluster
3. We kick off Week 1 on [proposed start date]

---

[Your Name]
[Your Email]
[Your Website]
\`\`\`

### The Contract Template

Use this as a starting point. **Have a solicitor review it before first use** (€200-400, one-time cost).

\`\`\`markdown
# Independent Contractor Agreement

**Between:**
[Your Name / Company], [Your Address] ("Consultant")
**And:**
[Client Company], [Client Address] ("Client")

**Effective Date:** [date]

## 1. Scope of Work

Consultant will provide the services described in the attached Proposal
dated [date] ("the Project"). Any work outside this scope requires
written agreement and may incur additional fees.

## 2. Timeline

The Project will commence on [start date] and is expected to complete
within [X] weeks. Delays caused by Client (e.g., delayed access,
unavailable stakeholders) may extend the timeline.

## 3. Fees and Payment

- Total fee: €[amount]
- Payment schedule:
  - €[amount] due on signing (before work begins)
  - €[amount] due on project completion
- Payment method: Bank transfer to [IBAN]
- Payment terms: Due within 14 days of invoice date
- Late payment: Interest of 2% per month on overdue amounts

## 4. Intellectual Property

All work product (code, configurations, documentation) created during
the Project is owned by the Client upon full payment. Consultant retains
the right to use general knowledge, techniques, and non-confidential
methodologies in future work.

## 5. Confidentiality

Consultant will not disclose Client's proprietary information, trade
secrets, or data accessed during the Project. This obligation survives
termination. Consultant may list Client as a reference (company name
and general description of work) unless Client objects in writing.

## 6. Data Handling

Consultant will not retain, copy, or transfer Client data beyond what
is necessary to complete the Project. All Client data access will be
through Client-provided accounts and will be revoked upon completion.

## 7. Liability

Consultant's total liability is limited to the fees paid under this
Agreement. Consultant is not liable for indirect, incidental, or
consequential damages.

## 8. Termination

Either party may terminate with 7 days' written notice. If Client
terminates, Consultant is paid for work completed to date. If Consultant
terminates, Consultant will provide reasonable transition assistance.

## 9. Independent Contractor

Consultant is an independent contractor, not an employee. Consultant
is responsible for their own taxes, insurance, and benefits.

## 10. Governing Law

This Agreement is governed by the laws of Ireland.

---

**Consultant:**
Name: ________________________  Date: ____________
Signature: ____________________

**Client:**
Name: ________________________  Date: ____________
Title: ________________________
Signature: ____________________
\`\`\`

### Tools for Proposals & Contracts

| Purpose | Tool | Cost |
|---------|------|------|
| Proposals | Google Docs or Notion (PDF export) | Free |
| Contracts | PandaDoc or HelloSign | Free tier available |
| E-signatures | DocuSign or HelloSign | ~€10/month |
| Invoicing | Xero (popular in Ireland) or Wave | Wave is free |
| Time tracking | Toggl (if doing hourly retainers) | Free tier |

---

## Homework

1. **Customise the proposal template** with your details
2. **Customise the contract template** with your details
3. **Book a solicitor consultation** (€200-400) to review your contract
4. **Set up Xero or Wave** for invoicing
5. **Write a sample proposal** for the mock client from Module 3.3

---

Next: [Module 3.5: Finding Clients](module-3.5-finding-clients.md)`;

const content_3_5 = `## The 5 Channels That Work (Ranked by Speed)

---

### Channel 1: LinkedIn Outbound (Fastest — Start Today)

**Who to target:**
- CTOs and VPs of Engineering at Series A-C startups
- Heads of ML / AI at mid-size companies
- Engineering managers posting about AI infrastructure challenges

**How to find them:**
1. LinkedIn Search: "CTO" + "AI" or "machine learning" + company size 11-200
2. Job boards: Companies hiring "ML Platform Engineer" or "MLOps Engineer" — they have the problem, can't find the person
3. LinkedIn posts: Search "self-hosted LLM" or "GPU costs" — people talking about these problems are your prospects

**Daily outreach routine (30 minutes/day):**
\`\`\`
1. Find 5 prospects using the search methods above
2. Check their recent posts — engage genuinely (comment, like)
3. Send a personalised DM to 3 of them
4. Follow up on yesterday's DMs (if they viewed but didn't reply)
5. Log everything in your lead tracker
\`\`\`

**DM response rates (realistic expectations):**
- 20-30% will view your message
- 5-10% will reply
- 2-5% will take a call
- 50-70% of calls convert to proposals
- 50-70% of proposals close

**The math:** Send 10 DMs/day × 20 working days = 200 DMs/month → 10-20 replies → 4-10 calls → 2-7 proposals → 1-4 clients

**You need 2-3 clients for your first €10K month.**

---

### Channel 2: LinkedIn Content (Medium Speed — Compounds Over Time)

Post 3-4x per week. Your content pillars from Module 3.1:
1. Education (technical insights)
2. Pain points (problems you solve)
3. Behind the scenes (builds trust)
4. Results (social proof)

**Best posting times for EU/Ireland audience:**
- Tuesday-Thursday, 8-9am GMT (people checking LinkedIn over coffee)
- Avoid Mondays and Fridays

**Engagement strategy:**
- Comment on 10 relevant posts per day (before/after your own posts)
- Connect with people who engage with your content
- When someone comments on your post, DM them: "Thanks for the comment — are you working on [topic]?"

---

### Channel 3: Communities (Medium Speed)

**Where your prospects hang out:**
- **r/kubernetes** — answer questions about GPU workloads
- **r/mlops** — discuss infrastructure challenges
- **CNCF Slack** — kubernetes channels
- **MLOps Community Slack** — active community
- **Hacker News** — comment on AI infrastructure posts
- **Local meetups** — Dublin Tech Summit, AWS/GCP user groups in Ireland

**Strategy:** Answer questions. Be genuinely helpful. Don't sell directly. Add "I do this professionally" to your bio/signature. People will DM you.

---

### Channel 4: Referral Network (Slow Start, Best Long-Term)

**Who to build relationships with:**
- ML consultants / data scientists (they build models but can't deploy — you're their complement)
- Cloud architects (they know infrastructure but not AI-specific patterns — you're the specialist)
- Recruitment agencies (when they can't fill ML Platform Engineer roles, you're the interim solution)
- Startup accelerators (their portfolio companies all need this)

**How to build referral relationships:**
- Offer a 10-15% referral fee for introductions that close
- Send useful content to your referral partners
- Be easy to recommend: have a clear one-liner they can use

---

### Channel 5: Your Website + SEO (Slowest, But Autopilot)

Your Vercel site + blog posts = inbound leads over time.

**Blog post ideas (add to your site):**
- "How Much Does It Cost to Self-Host Llama 3?" (will rank for these searches)
- "vLLM vs Triton vs TGI: Which Should You Choose?"
- "K8s GPU Scheduling: The Complete Guide"
- "GDPR and Self-Hosted AI: What You Need to Know"

Each post ends with a CTA to your contact form.

---

### Client Qualification Checklist

Not every lead is worth pursuing. Qualify early:

**Good client signals:**
- [ ] Budget: can afford €3K+ (not looking for €500 freelancer)
- [ ] Timeline: needs this done in weeks, not "someday"
- [ ] Authority: you're talking to the decision-maker (CTO, VP)
- [ ] Pain: they've already tried and failed, or are blocked
- [ ] Scale: enough traffic to justify self-hosting

**Red flag signals:**
- "Can you do it for €500?"
- "We're still deciding if we want to use AI"
- "Can you also build our app / design our website / do our DevOps?"
- No clear budget or timeline
- "We'll pay you when we raise our next round"

**Walk away from bad clients.** One bad project drains more energy than three good ones.

---

## Your First Week Outreach Plan

\`\`\`
Monday:    Write + publish LinkedIn post #1 (pain point post)
           Send 5 DMs to CTOs of companies hiring ML engineers
           Comment on 10 relevant LinkedIn posts

Tuesday:   Send 5 DMs to VPs posting about AI challenges
           Follow up on Monday's DMs
           Engage in r/kubernetes or MLOps Slack

Wednesday: Publish LinkedIn post #2 (education post)
           Send 5 DMs
           Follow up on previous DMs

Thursday:  Send 5 DMs
           Follow up on all open conversations
           Engage in communities

Friday:    Publish LinkedIn post #3 (results/behind-the-scenes)
           Follow up on everything
           Review your lead tracker — what's working?
           Plan next week
\`\`\`

---

## Homework

1. **Build a list of 50 prospects** using the search methods above
2. **Send your first 10 DMs** this week
3. **Join 2 communities** and answer a question in each
4. **Identify 3 potential referral partners** and reach out
5. **Track everything** in your lead tracker

---

Next: [Module 3.6: Irish Business Basics](module-3.6-irish-business.md)`;

const content_3_6 = `## Setting Up Your Consulting Business in Ireland

---

### Sole Trader vs Limited Company

| | Sole Trader | Limited Company (Ltd) |
|---|---|---|
| Setup cost | Free (just start trading) | ~€200-400 (CRO registration) |
| Setup time | Immediate | 1-2 weeks |
| Tax rate | Income tax (20-40%) + PRSI + USC | Corporation tax 12.5% |
| Better when | Revenue < €75K/year | Revenue > €75K/year |
| Liability | Personal (unlimited) | Limited to company assets |
| Admin | Simple — Form 11 annually | More complex — accounts, annual return |
| Perception | Fine for starting | Looks more professional to enterprise clients |

**Recommendation:** Start as a sole trader. Switch to Ltd when revenue consistently exceeds €75K/year. Talk to an accountant before making the switch.

### Step-by-Step: Start as a Sole Trader

1. **Register with Revenue** — apply for a Tax Reference Number (if you don't already have one as a PAYE worker)
2. **Register for income tax** — Form TR1 (or TR2 for a company)
3. **VAT registration** — required when turnover exceeds €37,500 for services
4. **Choose a business name** (optional — you can trade under your own name)
5. **Open a business bank account** (optional as sole trader, but recommended for clean bookkeeping)
6. **Get professional indemnity insurance** — €300-500/year, covers you if a client claims your work caused them loss

### VAT Essentials

\`\`\`
Client in Ireland (B2B):     Charge VAT (23%)
Client in EU (B2B):          Reverse charge — no VAT (get their VAT number)
Client outside EU (B2B):     No VAT
Client is a consumer (B2C):  Charge VAT regardless of location
\`\`\`

**Practical tip:** Most of your clients will be B2B. Get their VAT number and apply reverse charge for EU clients. No VAT for non-EU clients. Simple.

**VAT registration threshold:** €37,500 for services. But you can voluntarily register earlier (useful if you want to reclaim VAT on business expenses like cloud costs, laptop, etc.).

### What to Track for Tax

Keep receipts/records for:
- **Income:** All invoices issued (amounts, dates, client details)
- **Expenses:** Cloud costs (GCP/AWS), software subscriptions, laptop/hardware, internet (portion), home office (portion), insurance, accountant fees, training/courses, travel to client meetings

**Allowable expenses reduce your taxable income.** If you earn €50K and have €10K in legitimate expenses, you pay tax on €40K.

### Invoicing Template

\`\`\`
[YOUR NAME / BUSINESS NAME]
[Your Address]
[Tax Reference Number]
[VAT Number (if registered)]

INVOICE

Invoice Number: INV-2026-001
Date: [date]
Due Date: [date + 14 days]

Bill To:
[Client Company Name]
[Client Address]
[Client VAT Number]

Description                          Amount
─────────────────────────────────────────────
AI Infrastructure Consulting         €9,000.00
(Build & Deploy — as per proposal
dated [date])

                          Subtotal:  €9,000.00
                          VAT (23%): €2,070.00   ← (or "Reverse charge" for EU)
                          TOTAL:     €11,070.00

Payment Details:
Bank: [Your Bank]
IBAN: [Your IBAN]
BIC: [Your BIC]
Reference: INV-2026-001

Payment terms: Net 14 days
\`\`\`

### Essential Admin Checklist

Before your first client:
- [ ] Tax registration with Revenue (or confirm existing PAYE covers self-employment)
- [ ] Business bank account (AIB, BOI, or Revolut Business)
- [ ] Invoicing tool set up (Xero, Wave, or even a spreadsheet)
- [ ] Professional indemnity insurance (look at Hiscox or Allianz Ireland)
- [ ] Accountant consultation booked (€200-400)
- [ ] Contract template reviewed by solicitor (€200-400)

### Resources

- **Revenue.ie** — official tax guidance for self-employed
- **CRO.ie** — company registration (if going Ltd route)
- **Chartered Accountants Ireland** — find an accountant near you
- **Enterprise Ireland** — grants and supports for Irish businesses
- **Local Enterprise Office** — free mentoring and small grants for new businesses

---

## Homework

1. **Call Revenue** (or check revenue.ie) to confirm your tax registration covers self-employment income
2. **Book an accountant consultation** — bring this module as your list of questions
3. **Set up a business bank account** (even Revolut Business works)
4. **Get a quote for professional indemnity insurance**
5. **Create your first invoice** using the template above

---

Next: [Week 4: Launch](../week-4-launch/module-4.1-linkedin-launch.md)`;

const content_4_1 = `## Stop Preparing. Start Posting.

You have the knowledge. You have the positioning. Now the only thing separating you from clients is visibility. This week, you publish every day.

---

### The 7-Day Post Calendar

| Day | Type | Topic | Template |
|-----|------|-------|----------|
| Mon | Education | GPU cost breakdown | See Post 1 below |
| Tue | Pain point | 5 K8s mistakes | Already written (linkedin-posts.md, Post 2) |
| Wed | Behind the scenes | "I just deployed Llama 3 on K8s — here's what happened" | See Post 3 below |
| Thu | Education | vLLM vs naive serving | See Post 4 below |
| Fri | Credibility | The hiring problem | Already written (linkedin-posts.md, Post 3) |
| Sat | Architecture | Stack diagram | Already written (linkedin-posts.md, Post 4) |
| Sun | Story / CTA | Why I started doing this | See Post 7 below |

### Post 1 (Monday): GPU Cost Breakdown

\`\`\`
I did the maths on self-hosting Llama 3 70B.

Here's what it actually costs:

OpenAI GPT-4 API (100K requests/day):
→ ~€90,000/month

Self-hosted on 2x A100 (on-demand):
→ ~€6,500/month

Self-hosted on 2x A100 (spot instances):
→ ~€2,800/month

Self-hosted, quantised, with autoscaling:
→ ~€1,400/month

That's a 98.4% cost reduction.

But here's the catch:

Getting to that €1,400/month number requires:
- Right GPU selection (most teams over-provision by 2-3x)
- Spot instance strategy with failover
- Autoscaling that actually works with GPU metrics
- Quantisation without quality loss
- Proper K8s scheduling with taints and tolerations

The savings are real. But they don't happen by accident.

If you're spending more than €5K/month on AI APIs or GPU
infrastructure, DM me — I'll tell you where the waste is.

#AI #Kubernetes #MLOps #CloudCost
\`\`\`

### Post 3 (Wednesday): Behind the Scenes

\`\`\`
I deployed Llama 3 8B on Kubernetes this week.

Here's what actually happened (the real version, not
the polished case study):

Hour 1: Terraform up. GKE cluster running. Feeling good.

Hour 2: GPU node pool created. Spot instances. L4 GPU.
Total cost so far: about €0.70/hour. Not bad.

Hour 3: Deployed vLLM. Pod stuck in CrashLoopBackOff.
Why? My liveness probe had a 30-second timeout.
The model takes 90 seconds to load into GPU memory.
K8s kept killing it for being "unhealthy."

Fix: startupProbe with 5-minute window. Crisis averted.

Hour 4: Model serving. Sent my first request.
"What is Kubernetes?" — perfect response in 1.2 seconds.
Sent 50 concurrent requests — all handled. GPU utilisation: 82%.

Hour 5: Monitoring. Prometheus + Grafana. GPU dashboards.
Cost tracking. Alerts for temperature and memory.

Hour 6: Load test. 200 concurrent users. P95 latency: 3.2s.
No errors. Autoscaler kicked in and added a second replica.

Total time: 6 hours.
Total cost: about €4.20 in cloud resources.
What most teams spend: 2-3 months and €50K+.

The difference isn't skill. It's knowing the patterns.

This is what I do for companies full-time now.

#Kubernetes #AI #MLOps #BuildInPublic
\`\`\`

### Post 4 (Thursday): vLLM Education

\`\`\`
If you're serving LLMs with a Flask/FastAPI wrapper, you're
wasting 70-80% of your GPU.

Here's why:

A basic Python API processes ONE request at a time.
While generating tokens for User A, Users B, C, and D wait.
The GPU sits idle between tokens.

vLLM fixes this with continuous batching:
→ Multiple requests processed simultaneously
→ GPU memory managed dynamically (PagedAttention)
→ 3-5x more throughput on the same hardware

Real numbers (Llama 3 8B, 1x A100, 128 concurrent users):

Flask wrapper:  ~200 tokens/sec,  12s P99 latency
vLLM:           ~2,400 tokens/sec, 620ms P99 latency

Same model. Same GPU. 12x improvement.

And vLLM exposes an OpenAI-compatible API, so your existing
code works with one change (the base URL).

If you're self-hosting LLMs without vLLM (or Triton/TGI),
you're paying 3-5x more than you need to.

#AI #MLOps #LLM #Kubernetes
\`\`\`

### Post 7 (Sunday): Your Story

\`\`\`
I've spent [X] years building cloud and data infrastructure.

Kubernetes clusters. Data pipelines. Cloud architecture.

6 months ago, I noticed something:

Every company I talked to was hitting the same wall with AI.

Their ML teams could build incredible models.
But getting those models to production? That's where
things fell apart.

GPU scheduling nightmares. 3-month deployment timelines.
Cloud bills that made finance teams panic. Compliance teams
saying "you can't send that data to OpenAI."

These aren't ML problems. They're infrastructure problems.

And infrastructure is what I've been doing for a decade.

So I started helping companies directly.

What I do now:
→ Deploy AI models on Kubernetes (2-3 weeks, not months)
→ Cut GPU costs by 40-60%
→ Full data sovereignty (GDPR-compliant, your cloud, your data)

If your ML team is stuck on infrastructure instead of
building features, DM me. I might be able to help.

#AI #Consulting #Kubernetes #CareerChange
\`\`\`

---

### Posting Best Practices

1. **No links in the post body** — LinkedIn suppresses posts with external links. Put links in the first comment.
2. **First line is the hook** — it must make people stop scrolling
3. **Use line breaks** — walls of text get skipped
4. **End with a CTA** — "DM me", "Comment below", "Link in comments"
5. **Reply to every comment** within 1 hour — it boosts the algorithm
6. **Post between 8-9am Irish time** on weekdays

---

## Homework

1. **Publish all 7 posts this week** — no excuses
2. **Engage with 10 posts per day** before and after your own post
3. **Track engagement** — which posts get the most views and DMs?
4. **Connect with everyone** who engages with your content

---

Next: [Module 4.2: Outreach Sprint](module-4.2-outreach-sprint.md)`;

const content_4_2 = `## This Is Where the Money Comes From

Content builds your brand long-term. Outreach pays the bills now.

---

### The 5-Day Sprint

| Day | Target | Activity |
|-----|--------|----------|
| Mon | 10 DMs | CTOs of startups hiring ML engineers |
| Tue | 10 DMs | VPs/Heads of ML posting about AI challenges |
| Wed | 10 DMs | Engineering leads at EU companies (GDPR angle) |
| Thu | 10 DMs | People who engaged with your LinkedIn posts |
| Fri | 10 DMs | Re-engage anyone who viewed but didn't reply + new targets |

### Finding Targets (30 min/day)

**Method 1: Job board mining**
Search on LinkedIn Jobs, Indeed, or Glassdoor:
- "ML Platform Engineer"
- "MLOps Engineer"
- "AI Infrastructure Engineer"

Companies posting these roles have the problem. You're the faster solution.

Find the CTO/VP/Head of Engineering → DM them.

**Method 2: LinkedIn search**
Search posts for:
- "self-hosted LLM"
- "GPU costs"
- "Kubernetes GPU"
- "deploying AI models"
- "MLOps challenges"

People writing about these problems are self-qualifying prospects.

**Method 3: Engagement mining**
Look at who liked/commented on popular MLOps posts. These people are interested in the topic → they might have the problem.

### The DM Sequence

**Day 1: First touch**
> Hi [name], I saw [specific thing — their post, their job listing, their company's AI feature]. [One sentence showing you understand their situation].
>
> I help companies get AI models to production on K8s in 2-3 weeks. Would a quick 15-min call be useful?

**Day 3 (if no reply, but they viewed): Follow up**
> Hi [name], just following up — I know LinkedIn messages are easy to miss. If infrastructure for AI workloads isn't a priority right now, no worries at all. But if it is, I'm happy to share some quick insights on [specific topic relevant to them].

**Day 7 (final follow up): Value-add**
> [name], last message from me — I put together a breakdown of [topic relevant to them] that you might find useful: [link to your LinkedIn post].
>
> If timing is ever right for a conversation, I'm here. Best of luck with [their project].

**Rules:**
- Maximum 3 messages total
- Always personalise the first line
- Never send copy-paste messages (people can tell)
- If they say no or don't reply after 3, move on gracefully

### Tracking Your Sprint

Update your lead-tracker.csv daily:

\`\`\`csv
Name,Company,Role,Source,First Contact Date,Status,Notes,Next Action,Next Action Date
[fill for each of your 50 targets]
\`\`\`

**Status options:** Contacted → Viewed → Replied → Call Booked → Proposal Sent → Won → Lost

### Expected Results (Realistic)

From 50 DMs:
- 25-35 will be viewed (50-70%)
- 5-10 will reply (10-20%)
- 2-5 will take a call (4-10%)
- 1-3 will receive proposals (2-6%)
- 1-2 will close (2-4%)

**1-2 clients from one week of outreach = €7-22K in revenue.**

If the numbers are lower, the issue is usually:
- **Low view rate** → your profile isn't compelling enough (fix headline/photo)
- **Low reply rate** → your message isn't personalised enough
- **Low call rate** → you're targeting the wrong people
- **Low close rate** → your discovery call or pricing needs work

### The Mindset

50 DMs sounds like a lot. It's 10 per day. That's 30-45 minutes of work.

Most won't reply. That's normal. You're not being rejected — they're just busy, or it's not the right time.

The 2-3 who DO reply are worth €10K+ each.

This is a numbers game with exceptional economics.

---

## Homework

1. **Complete the 50-DM sprint** — no shortcuts, no skipping days
2. **Log every interaction** in your lead tracker
3. **Book at least 1 discovery call** this week
4. **Review your stats on Friday** — what worked, what didn't?

---

Next: [Module 4.3: Portfolio & Case Study](module-4.3-portfolio.md)`;

const content_4_3 = `## Turn Your Lab Work Into Proof

You don't need paying clients to have a portfolio. Your Lab 2 deployment IS your portfolio.

---

### Your Portfolio Project

Take your Week 2 full-stack deployment and package it as a case study:

\`\`\`markdown
# Case Study: Production AI Inference on Kubernetes

## Challenge
Deploy a large language model (Llama 3 8B) on Kubernetes with
production-grade infrastructure — model serving, autoscaling,
monitoring, security, and cost optimisation.

## Solution

### Architecture
[Include your architecture diagram]

### Stack
- GKE cluster with GPU node pool (NVIDIA L4, spot instances)
- vLLM for model serving (continuous batching, OpenAI-compatible API)
- KEDA autoscaler with GPU-aware metrics
- Prometheus + Grafana for monitoring (GPU dashboards)
- Kubecost for cost tracking
- Kong API gateway with auth and rate limiting
- Terraform + Helm for reproducible infrastructure

### Results
- Time to deploy: 6 hours (vs. industry average of 2-3 months)
- Throughput: 2,400 tokens/sec (12x vs naive serving)
- P95 latency: 620ms under 128 concurrent users
- GPU utilisation: 82% (vs. typical 20-30%)
- Cost: €X/month with autoscaling (vs. €Y without)

### Screenshots
[Grafana GPU dashboard]
[Load test results]
[kubectl get pods showing the stack]
[Cost breakdown from Kubecost]
\`\`\`

### Where to Display Your Portfolio

1. **Your landing page** — add a "Case Studies" section
2. **LinkedIn Featured section** — pin the case study post
3. **GitHub** — your template repo IS the portfolio (make it public)
4. **Discovery calls** — "Let me show you what a typical deployment looks like"

### Turning Your First Client Into a Case Study

When you get your first paying client, negotiate case study rights upfront:

> "I'd like to offer you a 15% discount in exchange for being able to use this project as a case study — company name and general description, no proprietary details. It helps me grow the business, and you get a better rate."

Most clients say yes. Some prefer anonymity ("a Series B FinTech startup"). Both work.

### Your GitHub Profile as Portfolio

Make your GitHub profile page work for you:

1. **Pin your template repo** (k8s-ai-infra-template)
2. **Add a professional README** to your profile
3. **Keep your contribution graph active** (commits to the template repo count)

---

## Homework

1. **Write your case study** from Lab 2
2. **Take polished screenshots** of your Grafana dashboards and deployment
3. **Create an architecture diagram** (use draw.io, Excalidraw, or Mermaid)
4. **Add the case study to your landing page**
5. **Pin the template repo on GitHub** and make it public

---

Next: [Module 4.4: Your First Client](module-4.4-first-client.md)`;

const content_4_4 = `## The Complete Walkthrough

---

### The Timeline

\`\`\`
Day 1:    DM sent / prospect replies
Day 2-3:  Discovery call (15 min)
Day 4:    Proposal sent (1 page)
Day 5-7:  Follow up / negotiate
Day 7-10: Contract signed, 50% deposit received
Day 10:   Work begins
Day 30:   Work complete, 50% final payment, case study
\`\`\`

### Pre-Work (Before Day 1 of the Engagement)

Once the contract is signed:

- [ ] Invoice sent for 50% deposit
- [ ] Deposit received
- [ ] Client provides cloud access (IAM role, service account)
- [ ] Client provides current architecture docs (if any)
- [ ] Client provides model requirements (model name, use case, expected traffic)
- [ ] Client provides compliance requirements (GDPR, specific industry)
- [ ] You create a private Slack/Teams channel for communication
- [ ] You clone your template repo and create a client-specific branch

### Week 1: Architecture & Infrastructure

**Day 1-2: Deep Dive**
- Meet with client's engineering team (30-60 min)
- Review existing infrastructure
- Confirm model requirements and traffic expectations
- Identify compliance constraints
- Document decisions in architecture doc

**Day 3-5: Infrastructure Build**
- Customise Terraform for client's cloud/region
- Deploy K8s cluster + GPU node pool
- Verify GPU availability
- Set up namespaces, RBAC, network policies

**Deliverable:** Working K8s cluster with GPU nodes, architecture document

**Client touchpoint:** Brief update email/Slack message at end of Week 1

### Week 2: Application Layer

**Day 6-8: Model Serving**
- Deploy vLLM (or Triton, based on requirements)
- Configure model, quantisation, tensor parallelism
- Tune health checks for model load time
- Initial testing and validation

**Day 9-10: Monitoring**
- Deploy Prometheus + Grafana
- Install DCGM exporter
- Build GPU dashboard
- Configure alerts
- Deploy Kubecost

**Deliverable:** Model serving in production, monitoring stack live

**Client touchpoint:** Demo call — show the model working + dashboards

### Week 3: Hardening & Handoff

**Day 11-12: Security & Gateway**
- Deploy API gateway (Kong)
- Configure authentication, rate limiting
- TLS certificates
- Network policies review
- Security checklist audit

**Day 13-14: Testing**
- Load testing (hey or k6)
- Failure simulation (kill pods, reclaim spot nodes)
- Verify autoscaling works
- Verify monitoring alerts fire

**Day 15: Documentation & Handoff**
- Architecture document (final version)
- Runbook: day-to-day operations
- Runbook: incident response
- Cost optimisation report
- 60-minute handoff call with client's team (recorded)
- Remove your access / transfer ownership

**Deliverable:** Everything documented, handed off, client team can operate independently

### Post-Delivery

- [ ] Final invoice sent (50% remaining)
- [ ] Payment received
- [ ] Case study written (with client approval)
- [ ] Testimonial requested
- [ ] Retainer offered: "Now that it's running, I can handle ongoing optimisation for €2-3.5K/month. Interested?"
- [ ] Referral asked: "Know anyone else who might need this?"

---

### What If Things Go Wrong?

**Client's cloud access is delayed**
→ Don't wait. Start the architecture doc and Terraform modules locally. Bill starts when access is provided, or adjust timeline.

**Model doesn't fit on their GPU**
→ This is why the architecture review comes first. Recommend quantisation or a different GPU before deploying.

**Client keeps changing requirements**
→ "Happy to accommodate that. It's outside the original scope, so let me send you a change order for the additional work."

**Client is unresponsive**
→ "I need [X] to proceed. Without it, the timeline will slip by [Y] days. Can you get this to me by [date]?"

**You get stuck on something**
→ Google it, check Stack Overflow, ask in CNCF Slack, or ask me (Claude). Don't spend more than 2 hours stuck before seeking help.

---

### The Retainer Upsell

After delivery, 50-70% of clients want ongoing support. This is where recurring revenue lives.

**The pitch:**
> "The stack is running well. Over the next few months, you'll want to deploy new models, optimise costs further, handle scaling events, and keep everything updated. I can do that on a monthly retainer for €2-3.5K/month. It's essentially having a senior AI infrastructure engineer on call without the €150K+ salary."

---

## Congratulations

If you've followed this course — completed the labs, practised the calls, sent the outreach — you are now:

1. Technically capable of delivering production AI infrastructure
2. Equipped with sales scripts and business templates
3. Positioned as a specialist, not a generalist
4. Active on LinkedIn with a growing audience
5. In conversations with potential clients

**The only thing left is to do it.**

Your first client will be messy. You'll learn things no course can teach. That's normal. What matters is that you start.

Go make it happen.

---

## Course Complete — What's Next?

- [ ] Continue the outreach sprint (50 DMs/week until fully booked)
- [ ] Post on LinkedIn consistently (3-4x/week minimum)
- [ ] Deliver your first project and get a testimonial
- [ ] Raise your prices after 3 successful projects
- [ ] Consider the Ltd company switch when revenue > €75K
- [ ] Build referral partnerships
- [ ] Add more services (data pipeline consulting, MLOps, training)

**Your target:** 2-3 active clients at any time = €15-30K/month.

**You've got this.**`;

export const weeks: Week[] = [
  {
    id: "week-1",
    title: "Week 1: Technical Foundations",
    subtitle: "Know more than your client about their problem",
    iconName: "BookOpen",
    color: "text-blue-400",
    modules: [
      {
        id: "1.1",
        title: "The AI Infrastructure Landscape",
        duration: "30 min read",
        content: content_1_1,
      },
      {
        id: "1.2",
        title: "GPU Deep Dive",
        duration: "45 min read",
        content: content_1_2,
      },
      {
        id: "1.3",
        title: "Model Serving Frameworks",
        duration: "40 min read",
        content: content_1_3,
      },
      {
        id: "1.4",
        title: "K8s for AI Workloads",
        duration: "45 min read",
        content: content_1_4,
      },
      {
        id: "1.5",
        title: "Security & Compliance",
        duration: "30 min read",
        content: content_1_5,
      },
      {
        id: "1.6",
        title: "Lab: Deploy LLM on Local K8s",
        duration: "2-3 hours hands-on",
        content: content_1_6,
      },
    ],
  },
  {
    id: "week-2",
    title: "Week 2: Hands-On Mastery",
    subtitle: "Build it until it's boring. Then you're ready.",
    iconName: "FlaskConical",
    color: "text-emerald-400",
    modules: [
      {
        id: "2.1",
        title: "Full Stack Cloud Deploy",
        duration: "4-6 hours hands-on",
        content: content_2_1,
      },
      {
        id: "2.2",
        title: "Monitoring & Observability",
        duration: "2-3 hours",
        content: content_2_2,
      },
      {
        id: "2.3",
        title: "Autoscaling & Cost Optimisation",
        duration: "2-3 hours",
        content: content_2_3,
      },
      {
        id: "2.4",
        title: "API Gateway & Security",
        duration: "2 hours",
        content: content_2_4,
      },
      {
        id: "2.5",
        title: "Troubleshooting Playbook",
        duration: "1 hour read + practice",
        content: content_2_5,
      },
    ],
  },
  {
    id: "week-3",
    title: "Week 3: The Business",
    subtitle: "Technical skills get you in the room. Business skills pay the bills.",
    iconName: "Briefcase",
    color: "text-amber-400",
    modules: [
      {
        id: "3.1",
        title: "Positioning & Messaging",
        duration: "30 min",
        content: content_3_1,
      },
      {
        id: "3.2",
        title: "Pricing Psychology",
        duration: "30 min",
        content: content_3_2,
      },
      {
        id: "3.3",
        title: "The Discovery Call",
        duration: "45 min",
        content: content_3_3,
      },
      {
        id: "3.4",
        title: "Proposals & Contracts",
        duration: "30 min",
        content: content_3_4,
      },
      {
        id: "3.5",
        title: "Finding Clients",
        duration: "45 min",
        content: content_3_5,
      },
      {
        id: "3.6",
        title: "Irish Business Basics",
        duration: "20 min",
        content: content_3_6,
      },
    ],
  },
  {
    id: "week-4",
    title: "Week 4: Launch",
    subtitle: "Imperfect action beats perfect preparation.",
    iconName: "Rocket",
    color: "text-red-400",
    modules: [
      {
        id: "4.1",
        title: "7-Day LinkedIn Post Sprint",
        duration: "30 min/day",
        content: content_4_1,
      },
      {
        id: "4.2",
        title: "Outreach Sprint: 50 DMs",
        duration: "45 min/day x 5",
        content: content_4_2,
      },
      {
        id: "4.3",
        title: "Portfolio & Case Study",
        duration: "2 hours",
        content: content_4_3,
      },
      {
        id: "4.4",
        title: "Your First Client: Start to Finish",
        duration: "1 hour read",
        content: content_4_4,
      },
    ],
  },
];
